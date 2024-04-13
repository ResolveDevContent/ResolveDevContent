const btnEnviar   = document.querySelector('[data-btn]'),
      navbar      = document.querySelector('.navbar'),
      form        = document.querySelector('[data-form]'),
      inputNombre = document.querySelector('input[name="nombre"]'),
      inputAsunto = document.querySelector('input[name="asunto"]'),
      textarea    = document.querySelector('textarea[name="message"]'),
      info        = {
          nombre : '',
          asunto : '',
          message: '',
          mail   : ''  
        };

const debounce = (callback) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args)    
        }, 1000);
    }
}

const createMail = (event) => {
    info[event.target.name] = event.target.value;

    const invalids = form.querySelectorAll('input:required:invalid,textarea:required:invalid');

    if(invalids.length > 0) return;

    let mail;
    
    info.mail = document.querySelector('input[name="mail"]:checked').value;
    if(info.mail == "gmail") {
        mail = `https://mail.google.com/mail/u/0/?fs=1&to=resolveinfo.dev@gmail.com&su=${info.asunto}&body=${info.nombre}${info.message}&tf=cm`;
    }

    if(info.mail == "hotmail") {
        mail = `mailto:resolveinfo.dev@gmail.com?Subject=${info.asunto}&body=${info.nombre}${info.message}`;
    }

    console.log(mail)
    btnEnviar.setAttribute('href', encodeURI(mail));
    btnEnviar.classList.remove('disabled');
}
        
let flag = true;
window.addEventListener('scroll', () => {

    if(window.scrollY == 0 && !flag || window.scrollY > 0 && flag) {
        navbar.classList.toggle('top');
        flag = !flag;
    }

}, true);
inputNombre.addEventListener('input', debounce(createMail));
inputAsunto.addEventListener('input', debounce(createMail));
textarea.addEventListener('input', debounce(createMail));

