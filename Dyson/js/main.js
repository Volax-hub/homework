"use strict";

// =======================
// 📌 Инициализация данных
// =======================

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

let products = [];
let defaultProducts = [
  {
    id: 1,
    category: "фен",
    stock: 1,
    prices: ["59 990", "69 990"],
    photo: ["supersonic-hd07-1.jpg"],
    info: "Фен Dyson Supersonic HD07 синий медный с 5 насадками в чехле и расческами",
    quantity: 1,
    isNew: false,
    rating: 4.4,
  },
  {
    id: 2,
    category: "фен",
    stock: 0,
    prices: ["47 990", "51 990"],
    photo: ["supersonic-hd07-2.jpg"],
    info: "Фен Dyson Supersonic HD07 с 5 насадками и подставкой",
    quantity: 1,
    isNew: false,
    rating: 4.2,
  },
  {
    id: 3,
    category: "фен",
    stock: 3,
    prices: ["46 990", "51 990"],
    photo: ["supersonic-hd03.jpg"],
    info: "Фен Dyson Supersonic 4 насадки HD03 с чехлом для хранения цвет сирень",
    quantity: 1,
    isNew: true,
    rating: 4.6,
  },
  {
    id: 4,
    category: "фен",
    stock: 5,
    prices: ["59 990", "69 990"],
    photo: ["supersonic-hd07-1.jpg"],
    info: "Фен Dyson Supersonic HD07 синий медный с 5 насадками в чехле и расческами",
    quantity: 1,
    isNew: false,
    rating: 4.1,
  },
  {
    id: 5,
    category: "фен",
    stock: 0,
    prices: ["47 990", "51 990"],
    photo: ["supersonic-hd07-2.jpg"],
    info: "Фен Dyson Supersonic HD07 с 5 насадками и подставкой",
    quantity: 1,
    isNew: false,
    rating: 3.9,
  },
  {
    id: 6,
    category: "фен",
    stock: 1,
    prices: ["59 990", "69 990"],
    photo: ["supersonic-hd07-1.jpg"],
    info: "Фен Dyson Supersonic HD07 синий медный с 5 насадками в чехле и расческами",
    quantity: 1,
    isNew: false,
    rating: 5,
  },
  {
    id: 7,
    category: "фен",
    stock: 5,
    prices: ["47 990", "51 990"],
    photo: ["supersonic-hd07-2.jpg"],
    info: "Фен Dyson Supersonic HD07 с 5 насадками и подставкой",
    quantity: 1,
    isNew: true,
    rating: 4.9,
  },
  {
    id: 8,
    category: "фен",
    stock: 3,
    prices: ["46 990", "51 990"],
    photo: ["supersonic-hd03.jpg"],
    info: "Фен Dyson Supersonic 4 насадки HD03 с чехлом для хранения цвет сирень",
    quantity: 1,
    isNew: true,
    rating: 4.7,
  },
  {
    id: 9,
    category: "фен",
    stock: 1,
    prices: ["59 990", "69 990"],
    photo: ["supersonic-hd07-1.jpg"],
    info: "Фен Dyson Supersonic HD07 синий медный с 5 насадками в чехле и расческами",
    quantity: 1,
    isNew: false,
    rating: 4.8,
  },
  {
    id: 10,
    category: "фен",
    stock: 0,
    prices: ["47 990", "51 990"],
    photo: ["supersonic-hd07-2.jpg"],
    info: "Фен Dyson Supersonic HD07 с 5 насадками и подставкой",
    quantity: 1,
    isNew: true,
    rating: 4.5,
  },
  {
    id: 11,
    category: "фен",
    stock: 3,
    prices: ["46 990", "51 990"],
    photo: ["supersonic-hd03.jpg"],
    info: "Фен Dyson Supersonic 4 насадки HD03 с чехлом для хранения цвет сирень",
    quantity: 1,
    isNew: false,
    rating: 4,
  },
  {
    id: 12,
    category: "фен",
    stock: 3,
    prices: ["46 990", "51 990"],
    photo: ["supersonic-hd03.jpg"],
    info: "Фен Dyson Supersonic 4 насадки HD03 с чехлом для хранения цвет сирень",
    quantity: 1,
    isNew: false,
    rating: 3.8,
  },
  {
    id: 13,
    category: "фен",
    stock: 0,
    prices: ["47 990", "51 990"],
    photo: ["supersonic-hd07-2.jpg"],
    info: "Фен Dyson Supersonic HD07 с 5 насадками и подставкой",
    quantity: 1,
    isNew: false,
    rating: 4.2,
  },
  {
    id: 14,
    category: "фен",
    stock: 3,
    prices: ["46 990", "51 990"],
    photo: ["supersonic-hd03.jpg"],
    info: "Фен Dyson Supersonic 4 насадки HD03 с чехлом для хранения цвет сирень",
    quantity: 1,
    isNew: true,
    rating: 4.3,
  },
];

// ===========================
// 💾 Загрузка данных из localStorage
// ===========================

const saved = localStorage.getItem("products");
const parsed = saved ? JSON.parse(saved) : [];

if (parsed.length !== defaultProducts.length) {
  localStorage.setItem("products", JSON.stringify(defaultProducts));
  localStorage.setItem("productsVersion", "reset");
  products = defaultProducts;
} else {
  products = parsed;
}

// =======================
// 🎨 Рендеринг товаров на страницу
// =======================

const span = document.createElement("span");
span.textContent = ` ${products.length}`;
document.querySelector(".special__title").append(span);

let currentPage = 1; // Активная страница
const itemsPerPageDesktop = 6; // Элементов на странице
const itemsPerPageMobile = 4;

const mediaQuery = window.matchMedia("(max-width: 636px)");
const getItemsPerPage = () => (mediaQuery.matches ? itemsPerPageMobile : itemsPerPageDesktop);

mediaQuery.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});

// Отображение товаров на странице
const renderProducts = () => {
  const productList = document.querySelector(".special__product-list");
  productList.innerHTML = "";

  const itemsPerPage = getItemsPerPage();
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const visibleProducts = products.slice(start, end);
  visibleProducts.forEach((product) => {
    productList.appendChild(createProductElement(product));
  });

  document.querySelector(".pagination__page").textContent = `${currentPage} из ${totalPages}`;
};

// Создание элемента товара
const createProductElement = (product) => {
  const article = document.createElement("article");
  article.classList.add("special__product-item");
  article.innerHTML = `
    <a class="special__product-img" href="#">
                  <img src="img/content/products/${product.photo[0]}" alt="${product.info}">
                </a>
                
                  <h4 class="special__product-name">
                    ${product.info}
                  </h4>
                  <div class="special__product-info">
                    <span class="${
                      product.stock > 0 ? "special__product-stock" : "product-stock--false"
                    }">${product.stock > 0 ? "В наличии" : "Нет в наличии"}</span>
                    <span class="special__product-discount">-15%</span>
                    <span class="special__product-sale">${product.prices[0]}Р</span>
                    <span class="special__product-price">${product.prices[1]} Р</span>
                  </div>
                
                <div class="special__product-box">
                  <form class="counter" action="" data-id="${product.id}">
                    <button class="counter__minus ${
                      product.quantity > 1 ? "" : "counter--none"
                    }" type="button">
                      <svg width="20" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 1H1" stroke="#111111" stroke-width="2" stroke-linecap="round" />
                      </svg>
                    </button>
                    <span class="">${product.stock > 0 ? product.quantity : ""}</span>
                    <button class="counter__plus ${
                      product.quantity < product.stock ? "" : "counter--none"
                    }" type="button">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0003 19L10.0346 10M10.0003 1L10.0346 10M10.0346 10H19M10.0346 10H0.999999"
                          stroke="#111111" stroke-width="2" stroke-linecap="round" />
                      </svg>
                    </button>
                  </form>
                  <button class="special__product-cart" type="button" data-id="${
                    product.id
                  }" >В корзину</button>
                </div>
  `;
  return article;
};

// Пагинация страниц с товарами
document.querySelector(".pagination__prev").addEventListener("click", () => {
  const itemsPerPage = getItemsPerPage();
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

document.querySelector(".pagination__next").addEventListener("click", () => {
  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(products.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts();
  }
});

renderProducts();

// ===================
// 📊 Сортировка товаров
// ===================

function sortProducts(type) {
  if (!Array.isArray(products)) return;

  switch (type) {
    case "cheap":
      products.sort((a, b) => getPrice(a) - getPrice(b));
      break;
    case "expensive":
      products.sort((a, b) => getPrice(b) - getPrice(a));
      break;
    case "new":
      products.sort((a, b) => b.isNew - a.isNew);
      break;
    case "rating":
      products.sort((a, b) => b.rating - a.rating);
      break;
    default:
      products = [...defaultProducts];
      break;
  }
}

function getPrice(product) {
  return Number(product.prices?.[0].replace(/\s/g, "")) || 0;
}

// ==========================
// 🧾 Работа с товарами
// ==========================

let cartListId = [];
let cart = [];

// Счетчик товара и добавление в корзину
document.querySelector(".special__product-list").addEventListener("click", (e) => {
  // Счетчик +
  if (e.target.closest(".counter__plus")) {
    const idElement = Number(e.target.closest(".counter").dataset.id);

    const product = products.find((p) => p.id === idElement); // «Найди в массиве products[] товар p, у которого p.id равен переменной id, и сохрани его в переменную product.»
    // То же самое вручную
    // let product;
    // for (let p of products) {
    //   if (p.id === id) {
    //     product = p;
    //     break;
    //   }
    // }
    if (product.quantity < product.stock) {
      product.quantity++;
    } else if (product.stock === product.quantity) {
      showFalseAlert(e.target, `Всего товара в наличии ${product.stock}`);
    }
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }

  // Счетчик -
  if (e.target.closest(".counter__minus")) {
    const idElement = Number(e.target.closest(".counter").dataset.id);
    const product = products.find((p) => p.id === idElement);
    if (product.quantity > 1) product.quantity--;
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }

  // Добавление в корзину
  if (e.target.closest(".special__product-cart")) {
    const idElement = Number(e.target.closest(".special__product-cart").dataset.id);
    const product = products.find((p) => p.id === idElement);
    const article = document.createElement("article");
    article.setAttribute("data-id", product.id);
    article.classList.add("cart__item");
    article.innerHTML = `
    <img class="cart__item-img" src="img/content/products/${product.photo[0]}" alt="${
      product.info
    }">
    <div class="cart__item-info">
    <h3 class="cart__item-title">${product.info}</h3>
  <p>Цена: ${product.price}</p>
  <div class="cart__product-box">
    <form class="counter__cart" data-id="${product.id}">
      <button class="counter__minus-cart ${
        product.quantity === 1 ? "counter--none" : ""
      }" type="button">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 5H8" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
</svg>
      </button>
      <span class="quantity__cart">${product.quantity}</span>
      <button class="counter__plus-cart ${
        product.quantity < product.stock ? "" : "counter--none"
      }" type="button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 8H12" stroke="#111" stroke-width="2" stroke-linecap="round"/>
</svg>
      </button>
    </form>
    <button class="remove--from-cart" data-id="${product.id}">Удалить</button>
  </div>
  </div>
`;

    // Уведомления о товаре и добавление в отдельный список корзины
    const productInCart = cartListId.find((item) => item.id === product.id);
    if (productInCart) {
      showFalseAlert(e.target, "Товар уже в корзине");
    } else if (product.stock === 0) {
      showFalseAlert(e.target, "Товара нет в наличии");
    } else {
      showTrueAlert(e.target, `Товар добавлен в корзину`);
      cart.push({
        id: product.id,
        info: product.info,
        price: Number(product.prices?.[0].replace(/\s/g, "")),
        quantity: product.quantity,
        photo: product.photo,
        stock: product.stock,
      });
      cartListId.push({ id: product.id });
    }
    saveCart();
    renderCart();
  }
});

// Сохранение корзины
function saveCart() {
  localStorage.setItem("cartId", JSON.stringify(cartListId));
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Рендер корзины
function renderCart() {
  const savedId = localStorage.getItem("cartId");
  cartListId = savedId ? JSON.parse(savedId) : [];

  const savedCart = localStorage.getItem("cart");
  cart = savedCart ? JSON.parse(savedCart) : [];

  const modalList = document.querySelector(".modal__cart-list");

  modalList.querySelectorAll("article").forEach((el) => el.remove());

  const cartIcon = document.querySelector(".header__end-cart");
  const oldQuantity = cartIcon.querySelector(".header__end-cart--quantity");
  if (oldQuantity) oldQuantity.remove();

  // Добавление счетчика товаров на иконку корзины
  if (cart.length > 0) {
    const cartQuantity = document.createElement("div");
    cartQuantity.className = "header__end-cart--quantity";
    cartQuantity.innerHTML = `<span>${cart.length}</span>`;
    cartIcon.appendChild(cartQuantity);
  }

  //
  for (let product of cart) {
    const article = document.createElement("article");
    article.setAttribute("data-id", product.id);
    article.classList.add("cart__item");
    article.innerHTML = `
    <img class="cart__item-img" src="img/content/products/${product.photo[0]}" alt="${
      product.info
    }">
    <div class="cart__item-info">
    <h3 class="cart__item-title">${product.info}</h3>
  <p>Цена: ${product.price}</p>
  <div class="cart__product-box">
    <form class="counter__cart" data-id="${product.id}">
      <button class="counter__minus-cart ${
        product.quantity === 1 ? "counter--none" : ""
      }" type="button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 8H12" stroke="#111" stroke-width="2" stroke-linecap="round"/>
</svg>
      </button>
      <span class="quantity__cart">${product.quantity}</span>
      <button class="counter__plus-cart ${
        product.quantity < product.stock ? "" : "counter--none"
      }" type="button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 4 V12 M4 8 H12" stroke="#111" stroke-width="2" stroke-linecap="round"/>
</svg>
      </button>
    </form>
    <button class="remove--from-cart" data-id="${product.id}">Удалить</button>
  </div>
  </div>
`;
    if (product.stock != 0) {
      modalList.appendChild(article);
    }
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = total;
}

// Очистка корзины
document.querySelector(".modal__cart-clear").addEventListener("click", () => {
  cart = [];
  cartListId = [];
  saveCart();
  renderCart();
});

// =======================
// ➕➖ Изменение количества товаров в корзине
// =======================

document.querySelector(".modal__cart").addEventListener("click", (e) => {
  const id = Number(e.target.closest("[data-id]")?.dataset.id);
  if (!id) return;

  const productInCart = cart.find((p) => p.id === id);
  if (e.target.closest(".counter__plus-cart")) {
    if (productInCart.quantity < productInCart.stock) {
      productInCart.quantity++;
    } else if (productInCart.stock === productInCart.quantity) {
      showFalseAlert(e.target, `Всего товара в наличии ${productInCart.stock}`);
    }
    saveCart();
    renderCart();
  }

  if (e.target.closest(".counter__minus-cart")) {
    if (productInCart.quantity > 1) {
      productInCart.quantity--;
    }
    saveCart();
    renderCart();
  }

  if (e.target.classList.contains("remove--from-cart")) {
    removeFromCart(id);
    saveCart();
    renderCart();
  }
});

function removeFromCart(id) {
  cart = cart.filter((p) => p.id !== id);
  cartListId = cartListId.filter((p) => p.id !== id);
}

// ==========================
// 🛒 Меню корзины
// ==========================

const cartJS = document.querySelector(".js--cart");
const overlayCart = document.querySelector(".js--overlay-cart");
const openCartBtn = document.querySelector(".js--cart-btn");
const closeCartElements = document.querySelectorAll(".js--close-cart");

const toggleCart = (isActive) => {
  document.body.style.overflow = isActive ? "hidden" : "auto";
  cartJS.classList.toggle("cart--active", isActive);
  overlayCart.classList.toggle("overlay--active", isActive);
};

const openCart = () => {
  openCartBtn.addEventListener("click", () => {
    toggleCart(true);
  });
};

const closeCart = () => {
  closeCartElements.forEach((item) => {
    item.addEventListener("click", () => {
      toggleCart(false);
    });
  });
};

openCart();
closeCart();

// ==========================
// 📌 Бургер-меню
// ==========================

const burger = document.querySelector(".js--burger");
const overlayBurger = document.querySelector(".js--overlay-burger");
const openBurgerBtn = document.querySelector(".js--burger-btn");
const closeBurgerElements = document.querySelectorAll(".js--close-burger");

const navList = document.querySelector(".nav__list");
const burgerModal = document.querySelector(".modal__burger");
const headerLeft = document.querySelector(".header__left");

const mediaQueryNav = window.matchMedia("(max-width: 1400px)");

const renderNavBurger = () => {
  if (mediaQueryNav.matches) {
    burger.appendChild(navList);
  } else {
    headerLeft.appendChild(navList);
  }
};

renderNavBurger();

const toggleBurger = (isActive) => {
  document.body.style.overflow = isActive ? "hidden" : "auto";
  navList.classList.toggle("nav--burger", isActive);
  burger.classList.toggle("burger--active", isActive);
  overlayBurger.classList.toggle("overlay--active", isActive);
};

const openBurger = () => {
  openBurgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    burger.appendChild(navList);
    navList.style.visibility = "visible";
    toggleBurger(true);
  });
};

const closeBurger = () => {
  closeBurgerElements.forEach((item) => {
    item.addEventListener("click", () => {
      if (!mediaQueryNav.matches) {
        headerLeft.appendChild(navList);
        navList.style.visibility = "visible";
      } else {
        navList.style.visibility = "hidden";
      }
      toggleBurger(false);
    });
  });
};

// Закрыть модалку при нажатии на ссылку
burgerModal.addEventListener("click", (e) => {
  if (e.currentTarget.contains(navList)) {
    toggleBurger(false);
    renderNavBurger();
  }
});

openBurger();
closeBurger();

mediaQueryNav.addEventListener("change", () => {
  renderNavBurger();
});

// ==========================
// 🎯 Alert-сообщения
// ==========================

function showFalseAlert(targetElement, message) {
  const rect = targetElement.getBoundingClientRect();

  const alert = document.createElement("div");
  alert.className = "custom--alert-false";
  alert.textContent = message;

  document.body.appendChild(alert);

  alert.style.top = `${rect.top + window.scrollY - alert.offsetHeight - 5}px`;
  alert.style.left = `${rect.left + window.scrollX}px`;

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function showTrueAlert(targetElement, message) {
  const rect = targetElement.getBoundingClientRect();

  const alert = document.createElement("div");
  alert.className = "custom--alert-true";
  alert.textContent = message;

  document.body.appendChild(alert);

  alert.style.top = `${rect.top + window.scrollY - alert.offsetHeight - 5}px`;
  alert.style.left = `${rect.left + window.scrollX}px`;

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

// ============================
// 📂 Выпадающий список сортировки
// ============================

document.querySelectorAll(".special__dropdown").forEach((dropdown) => {
  const selected = dropdown.querySelector(".special__dropdown-selected");
  const list = dropdown.querySelector(".special__dropdown-list");
  const items = dropdown.querySelectorAll(".special__dropdown-item");
  const img = dropdown.querySelector(".special__dropdown-img"); // стрелка

  // открытие/закрытие списка
  selected.addEventListener("click", () => {
    const isOpen = list.classList.toggle("dropdown--open");
    img.classList.toggle("dropdown-img--active", isOpen);
    if (selected.classList.contains("dropdown--highlight")) {
      selected.classList.remove("dropdown--highlight");
    } else {
      selected.classList.add("dropdown--highlight");
    }
  });

  // выбор пункта
  items.forEach((item) => {
    item.addEventListener("click", () => {
      // убрать active со всех
      items.forEach((el) => el.classList.remove("dropdown--active"));
      // повесить active на выбранный
      item.classList.add("dropdown--active");
      // обновить выбранное значение
      selected.textContent = item.textContent;

      // закрыть список и убрать активный класс со стрелки
      list.classList.remove("dropdown--open");
      img.classList.remove("dropdown-img--active");
      selected.classList.remove("dropdown--highlight");
    });
  });
});

document.querySelector(".special__dropdown-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("special__dropdown-item")) {
    const type = e.target.dataset.value;

    sortProducts(type);
    currentPage = 1; // Сбросить на первую страницу после сортировки
    renderProducts();

    // Обновление активного класса
    document
      .querySelectorAll(".special__dropdown-item")
      .forEach((item) => item.classList.remove("dropdown--active"));
    e.target.classList.add("dropdown--active");
  }
});

// ==========================
// 🧷 Ограниченное добавление тегов
// ==========================

let tags = [
  "dyson стайлер для длинных волос",
  "dyson стайлер красный",
  "dyson hs01 airwrap compliete",
  "фен щетка дайсон",
];

const mediaQueryTag1000 = window.matchMedia("(max-width: 1000px)");
const mediaQueryTag385 = window.matchMedia("(max-width: 385px)");

const renderTags = () => {
  const tagList = document.querySelector(".special__tag-list");

  const getTagsPerPage = () => {
    if (mediaQueryTag385.matches) {
      const tag2 = `
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson стайлер красный</a>
                </li>
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson hs01 airwrap compliete</a>
                </li>
    `;

      return tag2;
    } else if (mediaQueryTag1000.matches) {
      const tag3 = `
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson стайлер красный</a>
                </li>
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson hs01 airwrap compliete</a>
                </li>
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">фен щетка дайсон</a>
                </li>
    `;
      return tag3;
    } else {
      const tag4 = `
    <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson стайлер для длинных волос</a>
                </li>
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson стайлер красный</a>
                </li>
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">dyson hs01 airwrap compliete</a>
                </li>
                <li class="special__tag-item">
                  <a class="special__tag-link" href="#">фен щетка дайсон</a>
                </li>
    `;
      return tag4;
    }
  };

  const tagsHTML = getTagsPerPage();
  tagList.innerHTML = tagsHTML;

  return tagsHTML;
};

mediaQueryTag1000.addEventListener("change", () => {
  renderTags();
});
mediaQueryTag385.addEventListener("change", () => {
  renderTags();
});

document.querySelector(".special__show").addEventListener("click", (e) => {
  e.preventDefault();
  const tagList = document.querySelector(".special__tag-list");
  const countLI = tagList.querySelectorAll(".special__tag-item").length;
  const maxLI = 15;

  if (countLI >= maxLI) {
    tagList.innerHTML = renderTags();
    return;
  }

  for (let i = 0; i < tags.length; i++) {
    const li = document.createElement("li");
    li.classList.add("special__tag-item");
    li.innerHTML = `<a class="special__tag-link" href="#">${tags[i]}</a>`;
    tagList.appendChild(li);
  }
});

// ==========================
// 📚 Аккордеон FAQ
// ==========================

const mediaQueryFAQ = window.matchMedia("(max-width: 600px)");

const renderTitleFAQ = () => {
  const title = document.querySelector(".faq__title");

  if (mediaQueryFAQ.matches) {
    title.textContent = "Часто задаваемые вопросы";
  } else {
    title.textContent = "FAQ — Часто задаваемые вопросы";
  }
};


mediaQueryFAQ.addEventListener("change", () => {
  renderTitleFAQ();
});

document.querySelectorAll(".accordion-list__item").forEach((item) => {
  const control = item.querySelector(".accordion-list__control");
  const content = item.querySelector(".accordion-list__content");
  const icon = control.querySelector(".accordion-list__control-icon");

  control.addEventListener("click", (e) => {
    e.preventDefault();
    if (content.classList.contains("accordion-list__content--opened")) {
      // закрыть
      content.style.maxHeight = null;
      content.classList.remove("accordion-list__content--opened");
      icon.classList.remove("accordion-icon--active");
    } else {
      // открыть
      content.classList.add("accordion-list__content--opened");
      icon.classList.add("accordion-icon--active");
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });
    }
  });
});

// ==========================
// 📸 Слайдер Swiper
// ==========================

const swiperGallery = new Swiper(".equipment__slider", {
  spaceBetween: 20,
  slidesPerView: 1,

  navigation: {
    nextEl: ".equipment__next",
    prevEl: ".equipment__prev",
  },

  breakpoints: {
    301: {
      slidesPerView: 1,
    },
    451: {
      slidesPerView: 2,
    },
    751: {
      slidesPerView: 3,
    },
    1001: {
      slidesPerView: 4,
    },
  },
});




