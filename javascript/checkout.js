import { displayCartItems } from "./display-cart-items.mjs";

let cartItems = JSON.parse(localStorage.getItem("cart"));

const ids = cartItems.map(({ id }) => id);
const noDuplicateItems = cartItems.filter(
  ({ id }, index) => !ids.includes(id, index + 1)
);

displayCartItems(noDuplicateItems);

console.log(cartItems.map(({ id }) => id));
