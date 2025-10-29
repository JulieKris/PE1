import { cartFunctions } from "./header.mjs";
import { displayCartItems } from "./display-cart-items.mjs";
import { displayProducts } from "./display-products.mjs";
import { displayCarouselItmes } from "./display-carousel-items.mjs";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

let allProducts = [];
let carouselProducts = [];

let cartItems = JSON.parse(localStorage.getItem("cart"));

const ids = cartItems.map(({ id }) => id);
const noDuplicateItems = cartItems.filter(
  ({ id }, index) => !ids.includes(id, index + 1)
);

console.log(noDuplicateItems);

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    allProducts = data.data;
    carouselProducts = allProducts.slice(0, 4);

    displayProducts(allProducts);
    displayCarouselItmes(carouselProducts);

    document.querySelector("#cart-count").innerText = JSON.parse(
      localStorage.getItem("cart")
    ).length;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();
cartFunctions();
displayCartItems(noDuplicateItems);
