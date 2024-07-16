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

const btnEnviar = document.querySelector('[data-btn]'),
      btnCard   = document.querySelectorAll('[data-card]'),
      popupList = document.querySelector('[data-list]'),
      navbar    = document.querySelector('.navbar'),
      details   = document.querySelectorAll("details"),
      form      = document.querySelector('[data-form]'),
      mails     = document.querySelectorAll('input[type="radio"]');


const info = {
  nombre : '',
  asunto : '',
  mensaje: ''
};

if(document.querySelector('input[name="mail"]:checked')) {
  info.mail = document.querySelector('input[name="mail"]:checked').value 
}

//-------------------------------------

const POPUPS = {
  basico: ['Landing Page', 'Diseño personalizado'],
  intermedio: ['Página a elección', 'Diseño personalizado', 'Funcionalidades'],
  personalizado: ['Desarrollo a medida', 'Funcionalidades avanzadas'],
  compartido: ['Fotos, textos, colores a elección', 'Diseño web adaptable', 'Vinculación con WhatsApp', 'Links a redes sociales', 'Posicionamiento SEO', 'Formulario de contacto', 'Configuración de Hosting y Dominio', 'Certificado SSL', 'Servicio de mantenimiento', 'Soporte GRATIS por 30 días']
}

// SCROLL ----------------------------------------------------------------------

document.querySelectorAll('[data-scroll]').forEach(function(root) {
  const scrollable = root.querySelectorAll('[data-scrollable]');
  
  root
      .querySelectorAll('[data-arrow]')
      .forEach(function (arrow) {
          arrow.addEventListener('click', function (evt) {
              evt.preventDefault();
  
              const direction = Number(arrow.dataset.arrow);
              scrollable.forEach(function (_scrollable) {
                  const _child = _scrollable.querySelector(':first-child');
                  if (!_child) { return; }
  
                  _scrollable.scrollLeft += _child.clientWidth * direction;
              });
          });
      });

  if (root.dataset.scroll == 'auto') {
      let AUTO_DELAY = 5000;

      if(root.dataset.delay) {
          AUTO_DELAY = root.dataset.delay;
      }
  
      var scroll_in_reverse = false;
  
      setInterval(function () {
          scrollable.forEach(function (_scrollable) {
              const _child = _scrollable.querySelector(':first-child');
              if (!_child) { return; }

              _scrollable.scrollLeft += _child.clientWidth * direction;

              var direction = 1;

              if (_scrollable.scrollWidth - _scrollable.scrollLeft - _scrollable.clientWidth < 1) {
                  scroll_in_reverse = true;
              }

              if (_scrollable.scrollLeft == 0) {
                  direction = 1;
                  scroll_in_reverse = false;
              }

              if (scroll_in_reverse) {
                  direction = direction * -1;
              }

              _scrollable.scrollLeft += _child.clientWidth * direction;
          });

      }, AUTO_DELAY);
  }
})

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

function createMail(event) {
    info[event.target.name] = event.target.value;

    const invalids = form.querySelectorAll('input:required:invalid,textarea:required:invalid');
    if(invalids.length > 0) {
        if(!btnEnviar.classList.contains('disabled')) {
            btnEnviar.classList.add('disabled');
        }
        return;
    };

    //-------------------------------------
    
    const bodyMail = `¡Hola soy ${info.nombre}! ${info.mensaje}, saludos cordiales.`;
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

    var isVisible = (elemTop >= 0) && (elemBottom <= (window.innerHeight + 400));
    
    return isVisible;
}

//-------------------------------------

function setTargetDetail(targetDetail) {
  details.forEach((detail) => {
    if (detail !== targetDetail) {
      detail.open = false;
    }
  });
}

//-----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const media = Array.from(document.querySelectorAll('img, video'));
  
    Promise.all(media.map(function(m) {
      return new Promise(function(res, rej) {
        if(m.tagName == 'IMG') {
          m.addEventListener('load', res);
        }
        if(m.tagName == 'VIDEO') {
          m.addEventListener('loadeddata', res);
        }
        setTimeout(function() {
          res();
        }, 3000)
      })
    }))
    .then(function() {
      document
        .querySelectorAll('#preloader')
        .forEach(function(preloader) {
          preloader.classList.add('hidden');
          document.body.classList.remove('is-loading');
        });
    });
  });

//-------------------------------------

let toggle = true;
window.addEventListener('scroll', () => {
    if(window.scrollY == 0 && !toggle || window.scrollY > 0 && toggle) {
        navbar.classList.toggle('top');
        toggle = !toggle;
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

if(form) {
  const mailsData = form.querySelectorAll('input[type="text"],textarea');

  Array.from(mailsData).forEach(elm => {
      elm.addEventListener('input', debounce(createMail));
  
      elm.addEventListener('change', function(evt) {
          if(elm.value || !elm.value) {
              elm.classList.toggle('input-active');
          }
      })
  })
}

//-------------------------------------

btnCard.forEach((btn) => {
  btn.addEventListener('click', () => {
    let list = `<li>
                  <span>${btn.dataset.card}</span>
                  <label for="modal">
                    <i class="icon close"></i>
                  </label>
                </li>`;
  
    const listItems = POPUPS[btn.dataset.card].concat(POPUPS['compartido']);
    
    listItems.forEach(item => {
      list += `<li>
                  <i class="icon check"></i>
                  <span>${item}</span>
               </li>`;
    });
  
    popupList.innerHTML = list;
  });
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

//-------------------------------------
if(btnEnviar) {
  btnEnviar.addEventListener('click', function(evt) {
    if(form) {
      const mailsData = form.querySelectorAll('input[type="text"],textarea');
  
      mailsData.forEach(function(input) {
        input.value = "";
        input.dispatchEvent(new Event('change'))
      })
    }
  })
}

document.querySelectorAll('.popup').forEach(function(menu) {
  const items = menu.querySelectorAll('ul > li > a');
  const checkbox = document.querySelector('input#menu');

  items.forEach(function(item) {
    item.addEventListener('click', function(evt) {
      if(checkbox.checked) {
        checkbox.checked = false;
      }
    })
  })
})

//-----------------------------------------------------------------------------

details.forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) setTargetDetail(detail);
  });
});

//-----------------------------------------------------------------------------

document
    .querySelectorAll("#reviews")
    .forEach(function(root) {
        root.querySelectorAll(".list-reviews").forEach(function(ul) {
            const li = ul.querySelectorAll('li');

            if(li.length <= 2) {
                ul.classList.add("threeLi");
                return;
            }

            ul.classList.remove("threeLi")
        })
    })

//-----------------------------------------------------------------------------

let palabras = ['Desarrollo web.', 'Soluciones Tecnológicas.', 'Innovación.'],
    letras,
    i = 0,
    substring = 0,
    len = palabras.length,
    flag = true,
    count = 0,
    delay = 20,
    speed = 120;

let typing = function () {
  setInterval(function () {
    if (flag && substring >= palabras[i].length) {
      ++count;
      if (count == delay) {
        flag = false;
        count = 0;
      }
    } else if (substring == 0) {
        flag = true;
        i++;

        if (i >= len) i = 0;
    }

    letras = palabras[i].slice(0, substring);

    if (count == 0) {
      if (flag) substring++;
      else substring--;
    }

    if(document.querySelector(".word")) {
      document.querySelector(".word").innerText = letras;
    }
  },speed);
};

typing();

//-----------------------------------------------------------------------------

/* ------- */

var slideUp = {
  delay: 175,
  duration: 1500,
  distance: "50%",
  origin: "bottom",
};

ScrollReveal().reveal('.slideUp', slideUp);
ScrollReveal().reveal('.card', {interval: 500, delay: 150});