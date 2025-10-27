import { displayProducts } from "./display-products.mjs";
import { displayCarouselItmes } from "./display-carousel-items.mjs";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

let allProducts = [];
let carouselProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    allProducts = data.data;
    carouselProducts = allProducts.slice(0, 3);

    displayProducts(allProducts);
    displayCarouselItmes(carouselProducts);

    console.log(data.data);
    console.log(carouselProducts);
    console.log(document.querySelector(".discounted-price").innerText);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();
