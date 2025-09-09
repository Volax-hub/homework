/**
 * Функция выполняет дейтсвие закрытия и открытия меню в header в адаптиве.
 * @param {any} burgerIcon - иконка меню
 * @param {any} burgerNavLink  - ссылки в меню
 */
(function () {
  document.addEventListener("click", burgerInit);

  function burgerInit(e) {
    const burgerIcon = e.target.closest(".burger-icon");
    const burgerNavLink = e.target.closest(".nav__link");

    if (!burgerIcon && !burgerNavLink) return;
    if (document.documentElement.clientWidth > 900) return; // В начале определяем какая ширина экрана сейчас у пользователя

    if (!document.body.classList.contains("body--opened-menu")) {
      document.body.classList.add("body--opened-menu");
    } else {
      document.body.classList.remove("body--opened-menu");
    }
  }
})(); // Самовызываемая функция


// ==========================================================

const btn = document.querySelector('.about__img-button');
const modal = document.querySelector('.modal');
const body = document.querySelector('.body');

const closeModal = () => {
  body.classList.remove('body--modal-opened');
}

const openModal = () => {
  body.classList.add('body--modal-opened');
}

btn.addEventListener('click', openModal);

modal.addEventListener('click', (event) => {
  event.preventDefault()
  const target = event.target;
  if (target && target.classList.contains("modal") || target.closest('.modal__cancel')) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code === 'Escape' && body.classList.contains('body--modal-opened')) {
    closeModal();
  }
})