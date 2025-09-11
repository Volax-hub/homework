"use strict";

// Бургер

document.addEventListener("click", burgerInit);

/**
 * Функция выполняет действие закрытия и открытия меню в header в адаптиве.
 * @param {any} burgerIcon - иконка меню
 * @param {any} burgerNavLink  - ссылки в меню
 */
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

// Модалка

const btn = document.querySelector(".about__img-button");
const modal = document.querySelector(".modal");
const body = document.querySelector(".body");

const closeModal = () => {
  body.classList.remove("body--modal-opened");
};

const openModal = () => {
  body.classList.add("body--modal-opened");
};

btn.addEventListener("click", openModal);

/** Закрывает модальное окно при нажатии на внешний фон или крестик */
modal.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target;
  if ((target && target.classList.contains("modal")) || target.closest(".modal__cancel")) {
    closeModal();
  }
});

/** Закрывает модальное окно при нажатии на Escape */
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code === "Escape" && body.classList.contains("body--modal-opened")) {
    closeModal();
  }
});

// Табы

const tabControls = document.querySelector(".tab-controls");

tabControls.addEventListener("click", toggleTab);

/** Функция отображает контент по id и убирает классы с предыдущего активного таба и меняет цвет*/
function toggleTab(event) {
  const tabControl = event.target.closest(".tab-controls__link");

  if (!tabControl) return;

  event.preventDefault();
  if (tabControl.classList.contains("tab-controls__link--active")) return;

  const tabContentID = tabControl.getAttribute("href");
  const tabContent = document.querySelector(tabContentID);
  const activeControl = document.querySelector(".tab-controls__link--active");
  const activeContent = document.querySelector(".tab-content--show");

  if (activeControl) {
    activeControl.classList.remove("tab-controls__link--active");
  }
  if (activeContent) {
    activeContent.classList.remove("tab-content--show");
  }

  tabControl.classList.add("tab-controls__link--active");
  tabContent.classList.add("tab-content--show");
}

// Аккордеон

const accordionLists = document.querySelectorAll(".accordion-list");

accordionLists.forEach((Element) => {
  Element.addEventListener("click", (event) => {
    const accordionList = event.currentTarget; // Элемент, для которого было назначено событие
    const accordionOpenedItem = accordionList.querySelector(".accordion-list__item--opened");
    const accordionOpenedContent = accordionList.querySelector(".accordion-list__item--opened .accordion-list__content");

    //
    const accordionControl = event.target.closest(".accordion-list__control");
    if (!accordionControl) return;
    const accordionItem = accordionControl.parentElement;
    const accordionContent = accordionControl.nextElementSibling;

    //
    if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
      accordionOpenedItem.classList.remove("accordion-list__item--opened");
      accordionOpenedContent.style.maxHeight = null;
    }

    accordionItem.classList.toggle("accordion-list__item--opened");

    if (accordionItem.classList.contains("accordion-list__item--opened")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = null;
    }
    
  });
});
