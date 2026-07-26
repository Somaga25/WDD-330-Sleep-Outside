import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Animate the cart (backpack) icon
function animateCart() {
  const cart = document.getElementById("cartIcon");
  if (!cart) return;

  cart.classList.remove("cart-bounce");
  void cart.offsetWidth;
  cart.classList.add("cart-bounce");

  cart.addEventListener(
    "animationend",
    () => cart.classList.remove("cart-bounce"),
    { once: true }
  );
}

// Add a product to local storage
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);

  // Animate the backpack icon
  animateCart();
}

// Add to Cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(
    e.currentTarget.dataset.id
  );

  addProductToCart(product);
}

// Attach the event listener
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);