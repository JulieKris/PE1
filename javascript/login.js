import { displayCartItems, displayCartTotal } from "./cart.mjs";
import { cartFunctions, updateCartCount } from "./header.mjs";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

let allProducts = [];

let cartItems = JSON.parse(localStorage.getItem("cart"));

async function fetchProducts() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/online-shop/");
    const data = await response.json();

    allProducts = data.data;

    let randomProducts = allProducts.sort(() => Math.random() - 0.5);
    let slideImages = randomProducts.slice(0, 5);

    createSlides(slideImages);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();

var number = 0;

function createSlides(products) {
  products.forEach((product) => {
    const slideImage = document.createElement("img");

    slideImage.setAttribute("src", product.image.url);
    slideImage.className = "slide" + number++;

    document.querySelector("#form-slides").appendChild(slideImage);
  });
}

cartFunctions();
updateCartCount();
displayCartTotal();
displayCartItems(cartItems);
