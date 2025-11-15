import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

// my codes

function calculateCartTotal(cartItems) {
  return cartItems.reduce((sum, item) => {
    return sum + Number(item.FinalPrice);
  }, 0);
}

function displayCartTotal(total) {
  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (total > 0) {
    footer.classList.remove("hide");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

function loadCartPage() {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const total = calculateCartTotal(cart);
  displayCartTotal(total);
}

loadCartPage();
