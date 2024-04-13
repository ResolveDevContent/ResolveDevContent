  
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY == 0) {
        if(!navbar.classList.contains('top')) {
            navbar.classList.add('top');
        }
    } else {
        navbar.classList.remove('top');
    }
}, true);