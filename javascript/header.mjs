export function cartFunctions() {
  const open = document.querySelector("#cart-icon");
  const close = document.querySelector("#cart-close");

  open.addEventListener("click", function openMenu() {
    document.querySelector(".cart-container").style.width = "600px";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });
}

export function updateCartCount() {
  let individualProductCount = [];
  let newCartCount = JSON.parse(localStorage.getItem("cart"));
  newCartCount.forEach((product) => {
    individualProductCount.push(product.quantity);
  });

  newCartCount = individualProductCount.reduce((a, b) => a + b, 0);

  document.querySelector("#cart-count").innerText = newCartCount;
}
