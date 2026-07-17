const config_container = document.getElementById('config-container')
const config_container_css = document.querySelector('.container-config')
const gear = document.getElementById('config-icon')
const background_blur = document.querySelector('.blur')

document.addEventListener('click', function(event) {
    if (!config_container.contains(event.target)) {
        config_container_css.style.display = 'none'
        background_blur.style.display = 'none'
    }
})

gear.addEventListener('click', function(event) {
    event.stopPropagation();
    config_container_css.style.display = 'flex'
    background_blur.style.display = 'flex'
})