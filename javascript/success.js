import {
  cartFunctions,
  displayLoggedIn,
  profile,
  updateCartCount,
} from "./header.mjs";
import { displayCartItems, displayCartTotal } from "./cart.mjs";

document
  .querySelector("#close-success")
  .addEventListener("click", function leaveSuccessPage() {
    window.location.href = "../index.html";
  });

localStorage.setItem("cart", "[]");

let cartItems = JSON.parse(localStorage.getItem("cart"));
let customer = sessionStorage.getItem("customer");

const successMessage = document.createElement("p");
successMessage.innerHTML =
  "Thank you for shopping with us, " +
  customer +
  "." +
  "<br/>" +
  " An email detailing your order will be sent promptly.";

document.querySelector("#checkout-success").appendChild(successMessage);

profile();
cartFunctions();
displayLoggedIn();
updateCartCount();
displayCartItems(cartItems);
displayCartTotal();
