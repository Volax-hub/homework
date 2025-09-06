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
