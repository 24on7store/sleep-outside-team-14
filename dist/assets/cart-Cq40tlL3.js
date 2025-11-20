import{g as e}from"./utils-DTA1AWa-.js";/* empty css              */function c(){const a=e("so-cart").map(r=>o(r));document.querySelector(".product-list").innerHTML=a.join("")}function o(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}c();function n(t){return t.reduce((a,r)=>a+Number(r.FinalPrice),0)}function l(t){const a=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");t>0&&(a.classList.remove("hide"),r.textContent=`Total: $${t.toFixed(2)}`)}function s(){let t=JSON.parse(localStorage.getItem("so-cart"))||[];const a=n(t);l(a)}s();
