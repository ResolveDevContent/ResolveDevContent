const btnEnviar = document.querySelector('[data-btn]'),
      navbar = document.querySelector('.navbar'),
      info = {
          nombre : '',
          asunto : '',
          message: '',
          mail   : ''  
        };

let flag = true;
window.addEventListener('scroll', () => {

    if(window.scrollY == 0 && !flag || window.scrollY > 0 && flag) {
        navbar.classList.toggle('top');
        flag = !flag;
    }

}, true);


input.addEventListener('change', event => {
    event.preventDefault();

    setTimeout(() => {
        info[input.name] = input.value;     
    }, 500);

    const form     = document.closest('[data-form]'),
          invalids = form.querySelectorAll('input:required:invalid,textarea:required:invalid');

    if(invalids.length > 0) return;

    let mail;

    if(info.mail == "gmail") {
        mail = `https://mail.google.com/mail/u/0/?fs=1&to=resolveinfo.dev@gmail.com&su=${info.asunto}&body=${info.nombre}${info.message}&tf=cm`;
    }

    if(info.mail == "hotmail") {
        mail = `mailto:resolveinfo.dev@gmail.com?Subject=${info.asunto}&body=${info.nombre}${info.message}`;
    }

    console.log(mail)
    btnEnviar.setAttribute('href', encodeURI(mail))
    btnEnviar.classList.remove('disabled');
});


