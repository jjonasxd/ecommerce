const coffee_button = document.getElementById('buy-me-coffee');
const coffee_display = document.querySelector('.coffee-container');
const coffee_container = document.getElementById('coffee-container');
const menu_blur = document.querySelector('.coffee-blur')

if (coffee_button) {
        coffee_button.addEventListener('click', function() {
        coffee_display.style.display = 'flex';
        menu_blur.style.zIndex = '1'
        menu_blur.style.backdropFilter = 'blur(3px)'
    });

    document.addEventListener('click', function(event) {
        if (coffee_display.style.display === 'flex' && !coffee_container.contains(event.target) && !coffee_button.contains(event.target)) { //usei ia nessa linha
            coffee_display.style.display = 'none';
            menu_blur.style.zIndex = '-10'
            menu_blur.style.backdropFilter = 'blur(0px)'
        }
    });
}