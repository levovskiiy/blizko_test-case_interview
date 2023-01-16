const menuButton = document.querySelector('.header__burger-btn');
const menu = document.querySelector('.header__menu');
const showClass = 'show'

menuButton.addEventListener('click', () => {
  menu.classList.toggle(showClass);
});
