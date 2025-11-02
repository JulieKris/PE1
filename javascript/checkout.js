import { displayCartItems } from "./display-cart-items.mjs";
import { displayCartTotal } from "./cart.mjs";

let cartItems = JSON.parse(localStorage.getItem("cart"));

const ids = cartItems.map(({ id }) => id);
const noDuplicateItems = cartItems.filter(
  ({ id }, index) => !ids.includes(id, index + 1)
);

displayCartTotal();
displayCartItems(noDuplicateItems);

console.log(cartItems.map(({ id }) => id));
