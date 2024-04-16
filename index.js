//-----------------------------------------------------------------------------
// LIBRERIA PARA SMOOTH SCROLL

SmoothScroll({
    animationTime     : 800, // [ms]
    stepSize          : 100, // [px]
    accelerationDelta : 50,  // 50
    accelerationMax   : 3,   // 3
    keyboardSupport   : true,  // option
    arrowScroll       : 50,    // [px]
    pulseAlgorithm    : true,
    pulseScale        : 4,
    pulseNormalize    : 1,
    touchpadSupport   : false, // ignore touchpad by default
    fixedBackground   : true, 
    excluded          : ''    
})

//-----------------------------------------------------------------------------

const btnEnviar   = document.querySelector('[data-btn]'),
      navbar      = document.querySelector('.navbar'),
      form        = document.querySelector('[data-form]'),
      mailsData   = form.querySelectorAll('input[type="text"],textarea')
      mails       = document.querySelectorAll('input[type="radio"]'),
      info        = {
          nombre : '',
          asunto : '',
          message: '',
          mail   : document.querySelector('input[name="mail"]:checked').value 
        };

//-----------------------------------------------------------------------------

const debounce = callback => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args)    
        }, 1000);
    }
}

//-------------------------------------

const createMail = event => {
    info[event.target.name] = event.target.value;

    const invalids = form.querySelectorAll('input:required:invalid,textarea:required:invalid');
    if(invalids.length > 0) {
        if(!btnEnviar.classList.contains('disabled')) {
            btnEnviar.classList.add('disabled');
        }
        return;
    };

    //-------------------------------------
    
    const bodyMail = `¡Hola soy ${info.nombre}! ${info.message}, saludos cordiales.`;
    let mail;
    if(info.mail == "gmail") {
        mail = `https://mail.google.com/mail/u/0/?fs=1&to=resolveinfo.dev@gmail.com&su=${info.asunto}&body=${bodyMail}&tf=cm`;
    }

    if(info.mail == "hotmail") {
        mail = `mailto:resolveinfo.dev@gmail.com?Subject=${info.asunto}&body=${bodyMail}`;
    }

    btnEnviar.setAttribute('href', encodeURI(mail));
    btnEnviar.classList.remove('disabled');
}

//-------------------------------------

function isScrolledIntoView(elem) {
    var rect = elem.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
  
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    
    return isVisible;
}

//-----------------------------------------------------------------------------

let flag = true;
window.addEventListener('scroll', () => {
    if(window.scrollY == 0 && !flag || window.scrollY > 0 && flag) {
        navbar.classList.toggle('top');
        flag = !flag;
    }

    document
        .querySelectorAll('.start-animation')
        .forEach(function(container) {
            if (isScrolledIntoView(container)) {
                container.classList.add('inView');
            } 
        });
}, true);



//-------------------------------------

Array.from(mailsData).forEach(elm => {
    elm.addEventListener('input', debounce(createMail));
})

//-------------------------------------

Array.from(mails).forEach(elm => {
    elm.addEventListener('change', event => {
        event.preventDefault();

        Array.from(mails).forEach(row => {
            const element = row.closest('label');

            if(element.classList.contains('active') || row == elm) {
                element.classList.toggle('active');
            }
        });
        
        createMail(event);
    });
});

//-----------------------------------------------------------------------------
