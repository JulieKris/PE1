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

profile();
cartFunctions();
displayLoggedIn();
updateCartCount();
displayCartItems(cartItems);
displayCartTotal();
