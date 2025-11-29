import { getLocalStorage } from "./utils.mjs";

// Render Cart
function renderCartContents() {
  let cartItems = normalizeCart(getLocalStorage("so-cart"));
  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  attachQuantityHandlers();
  updateTotal(cartItems);
}

// Ensure every item has a quantity
function normalizeCart(cart) {
  const fixed = cart.map(item => {
    if (!item.quantity) item.quantity = 1;
    return item;
  });
  localStorage.setItem("so-cart", JSON.stringify(fixed));
  return fixed;
}

// Cart Item Template
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider" data-id="${item.Id}">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>

      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || ""}</p>

      <div class="quantity-controls">
        <button class="qty-minus">−</button>
        <span class="cart-card__quantity">${item.quantity}</span>
        <button class="qty-plus">+</button>
      </div>

      <p class="cart-card__price">$${item.FinalPrice}</p>

      <p class="cart-item-subtotal">
        Subtotal: $${(item.FinalPrice * item.quantity).toFixed(2)}
      </p>
    </li>
  `;
}

// Attach Handlers to + / − Buttons
function attachQuantityHandlers() {
  document.querySelectorAll(".qty-plus").forEach((btn) => {
    btn.addEventListener("click", increaseQuantity);
  });

  document.querySelectorAll(".qty-minus").forEach((btn) => {
    btn.addEventListener("click", decreaseQuantity);
  });
}

// Increase quantity
function increaseQuantity(event) {
  const li = event.target.closest("li");
  const id = li.dataset.id;

  let cart = getLocalStorage("so-cart");
  let item = cart.find((p) => p.Id == id);

  item.quantity++;

  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
}


// Decrease quantity or remove
function decreaseQuantity(event) {
  const li = event.target.closest("li");
  const id = li.dataset.id;

  let cart = getLocalStorage("so-cart");
  let item = cart.find((p) => p.Id == id);

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter((p) => p.Id != id);
  }

  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents();
}


// Calculate Total
function calculateCartTotal(cartItems) {
  return cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * item.quantity,
    0
  );
}


// Display Total
function updateTotal(cartItems) {
  const total = calculateCartTotal(cartItems);
  const footer = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (total > 0) {
    footer.classList.remove("hide");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}


renderCartContents();
