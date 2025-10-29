export function cartFunctions() {
  const open = document.querySelector("#cart-icon");
  const close = document.querySelector("#cart-close");

  open.addEventListener("click", function openMenu() {
    document.querySelector(".cart-container").style.width = "700px";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });
}
