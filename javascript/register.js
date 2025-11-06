import {
  cartFunctions,
  displayLoggedIn,
  profile,
  updateCartCount,
} from "./header.mjs";
import { displayCartItems, displayCartTotal } from "./cart.mjs";

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
displayLoggedIn();
profile();
cartFunctions();
displayCartItems(cartItems);
displayCartTotal();
updateCartCount();

var number = 0;

function createSlides(products) {
  products.forEach((product) => {
    const slideImage = document.createElement("img");

    slideImage.setAttribute("src", product.image.url);
    slideImage.className = "slide" + number++;

    document.querySelector("#form-slides").appendChild(slideImage);
  });
}

const usernameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const confirmPassError = document.querySelector("#confirm-password-error");

let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmedPassword = document.querySelector("#confirm-password");

document.querySelector("#register-button").addEventListener("click", (e) => {
  e.preventDefault();

  //register form check
  if (username.value == 0) {
    username.style.borderColor = "red";
    usernameError.style.display = "block";
    usernameError.innerText = "Please input a username.";
  } else {
    username.style.borderColor = "black";
    usernameError.style.display = "none";
    if (email.value == 0) {
      email.style.borderColor = "red";
      emailError.style.display = "block";
      emailError.innerText = "Please input an email.";
    } else {
      if (!email.value.includes("@") && !email.value.includes(".")) {
        emailError.innerText = "The email is not valid.";
      } else {
        email.style.borderColor = "black";
        emailError.style.display = "none";
        if (password.value == 0) {
          password.style.borderColor = "red";
          passwordError.style.display = "block";
          passwordError.innerText = "Please input a password.";
        } else {
          password.style.borderColor = "black";
          passwordError.style.display = "none";
          if (password.value !== confirmedPassword.value) {
            confirmedPassword.style.borderColor = "red";
            confirmPassError.style.display = "block";
            confirmPassError.innerText =
              "Confirmed password does not match password.";
          } else {
            confirmedPassword.style.borderColor = "black";
            confirmPassError.style.display = "none";

            //stores registered user in localstorage
            let user = {
              username: username.value,
              email: email.value,
              password: password.value,
            };

            localStorage.setItem("registeredUser", JSON.stringify(user));
            window.location.href = "../registration-success/index.html";
          }
        }
      }
    }
  }
});
