let flag = true;
const btnEnviar = document.querySelector('[data-btn]');

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if(window.scrollY == 0 && !flag || window.scrollY > 0 && flag) {
        navbar.classList.toggle('top');
        flag = !flag;
    }

    // if (window.scrollY == 0) {
    //     if(!navbar.classList.contains('top')) {
    //         navbar.classList.add('top');
    //     }
    // } else {
    //     navbar.classList.remove('top');
    // }
}, true);

btnEnviar.addEventListener('click', event => {
    event.preventDefault();

    const form = btnEnviar.closest('[data-form]'),
          info = {
            nombre : '',
            asunto : '',
            message: ''
          },
          invalids = form.querySelectorAll('input:required,textarea:required');

    if(invalids.length > 0) {
        const error = document.querySelector('[data-error]');
        error.textContent = 'Complete todos los campos para poder enviar el mail.';
        return;
    }
          
    const data = form.querySelectorAll('input,textarea');

    Array.from(data).forEach(item => {
        info[item.name] = item.value;
    });

    const mail = `mailto:resolutioninfo.dev.com?Subject=${encodeURI(info.asunto)}&body=${info.nombre}${encodeURI(info.message)}`;

    console.log(mail)
});