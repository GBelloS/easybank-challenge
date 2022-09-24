const header = document.querySelector('header')
const menu = header.querySelector('nav')
const logo = header.firstElementChild

const menuButton = header.appendChild(document.createElement('button'))
menuButton.type = 'button'
menuButton.classList.add('menu', 'hamburguer')

function toggleMenu()
{
    header.classList.toggle('sticky')
    menu.classList.toggle('visible')
    menuButton.classList.toggle('close')
}

menuButton.addEventListener('click',toggleMenu)
menu.addEventListener
(
    'click',
    event=>
    {
        if(
            innerWidth<=720 &&
            ( event.target.nodeName == 'A' ||
              event.target == event.currentTarget )
        ) toggleMenu()
    }
)
logo.addEventListener
(
    'click',
    event=>
    {
        if(innerWidth<=720 && menu.classList.contains('visible'))
            toggleMenu()
    }
)
window.addEventListener
(
    'resize',
    event=>
    {
        if(innerWidth>720 && menu.classList.contains('visible'))
            toggleMenu()
    }
)
