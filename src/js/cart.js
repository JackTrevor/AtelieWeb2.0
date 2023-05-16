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
  <span data-id="${item.id}" class="remove-item">X</span>
</li>`;

  return newItem;
}

renderCartContents();

function removeItemFromCart(event) {
  const cartItem = event.target.closest(".cart-card");
  const id = cartItem.dataset.id;

  const cart = getLocalStorage("so-cart");
  const newCart = JSON.parse(cart) || [];
  newCart = newCart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));

  cartItem.remove();
}

document.querySelectorAll(".remove-item").forEach((item) => {
  item.addEventListener("click", removeItemFromCart);
});

renderCartContents();

