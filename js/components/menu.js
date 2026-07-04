const menu = document.getElementById('menu')
const css_menu = document.querySelector('.menu')
const menu_blur = document.querySelector('.menu-blur')

menu.addEventListener('click', function() {
    css_menu.style.transform = 'translateX(0px)'
    menu_blur.style.zIndex = '30'
    menu_blur.style.backdropFilter = 'blur(10px)'
})

document.addEventListener('click', function(event) {
    if (!css_menu.contains(event.target) && css_menu.style.transform == 'translateX(0px)' && !menu.contains(event.target)) {
        css_menu.style.transform = 'translateX(230px)'
        menu_blur.style.zIndex = '-10'
        menu_blur.style.backdropFilter = 'blur(0px)'
    }
})