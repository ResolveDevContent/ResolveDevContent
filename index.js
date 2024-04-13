const btnEnviar = document.querySelector('[data-btn]'),
      navbar = document.querySelector('.navbar');

let flag = true;
window.addEventListener('scroll', () => {

    if(window.scrollY == 0 && !flag || window.scrollY > 0 && flag) {
        navbar.classList.toggle('top');
        flag = !flag;
    }

}, true);

btnEnviar.addEventListener('click', event => {
    event.preventDefault();

    const form = btnEnviar.closest('[data-form]'),
          info = {
            nombre : '',
            asunto : '',
            message: ''
          },
          invalids = form.querySelectorAll('input:required:invalid,textarea:required:invalid');

    if(invalids.length > 0) {
        const error = document.querySelector('[data-error]');
        error.textContent = 'Complete todos los campos para poder enviar el mail.';
        return;
    }
          
    const data = form.querySelectorAll('input[type="text"],input[type="radio"]:checked,textarea');

    Array.from(data).forEach(item => {
        info[item.name] = item.value;
    });

    let mail;

    if(info.mail == "gmail") {
        mail = `https://mail.google.com/mail/u/0/?fs=1&to=resolveinfo.dev@gmail.com&su=${encodeURI(info.asunto)}&body=${info.nombre}${encodeURI(info.message)}&tf=cm`;
    }

    if(info.mail == "hotmail") {
        mail = `mailto:resolveinfo.dev@gmail.com?Subject=${encodeURI(info.asunto)}&body=${info.nombre}${encodeURI(info.message)}`;
    }

    console.log(mail)
});

