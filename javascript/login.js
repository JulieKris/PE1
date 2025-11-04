import { displayCartItems, displayCartTotal } from "./cart.mjs";
import {
  cartFunctions,
  displayLoggedIn,
  profile,
  updateCartCount,
} from "./header.mjs";

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

displayLoggedIn();
profile();
cartFunctions();
updateCartCount();
displayCartTotal();
displayCartItems(cartItems);

let username = document.querySelector("#username");
let password = document.querySelector("#password");

//login form check
document.querySelector("#login-button").addEventListener("click", (e) => {
  e.preventDefault();
  if (username.value == 0) {
    username.style.borderColor = "red";
    document.querySelector("#login-username-error").style.display = "block";
  } else {
    username.style.borderColor = "black";
    document.querySelector("#login-username-error").style.display = "none";
    if (password.value == 0) {
      password.style.borderColor = "red";
      document.querySelector("#login-error").innerText =
        "Please input password.";
      document.querySelector("#login-error").style.display = "block";
    } else {
      if (
        username.value !==
          JSON.parse(localStorage.getItem("registeredUser")).username ||
        password.value !==
          JSON.parse(localStorage.getItem("registeredUser")).password
      ) {
        document.querySelector("#login-error").innerText =
          "Wrong password or username.";
        document.querySelector("#login-error").style.display = "block";
      } else {
        password.style.borderColor = "black";
        document.querySelector("#login-error").style.display = "none";
        localStorage.setItem("login", "true");
        window.location.href = "../index.html";
      }
    }
  }
});
