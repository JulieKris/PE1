import { cartFunctions } from "./header.mjs";
import { displayCartItems, displayCartTotal } from "./cart.mjs";

let cartItems = JSON.parse(localStorage.getItem("cart"));

cartFunctions();
displayCartTotal();
displayCartItems(cartItems);
