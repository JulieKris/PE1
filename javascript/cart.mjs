if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

import { updateCartCount } from "./header.mjs";

let cartItems = JSON.parse(localStorage.getItem("cart"));

export function displayCartItems(products) {
  if (localStorage.getItem("cart") == "[]") {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.innerText = "There are currently no items in your cart.";
    emptyCartMessage.className = "empty-cart";
    document.querySelector(".cart-total").style.display = "none";
    document.querySelector("#cart-items").appendChild(emptyCartMessage);

    if (window.location.href.includes("Checkout")) {
      document
        .querySelector("#checkout-cart-items")
        .appendChild(emptyCartMessage.cloneNode(true));
    }
  } else {
    document.querySelector(".cart-total").style.display = "flex";
  }
  // displays the products currently saved in the cart
  products.forEach((product) => {
    const cartProduct = document.createElement("div");
    const productImgContainer = document.createElement("div");
    const cartProductImg = document.createElement("img");
    const cartProductTitle = document.createElement("p");
    const cartPriceContainer = document.createElement("div");
    const cartProductPrice = document.createElement("p");
    const cartProductDiscPrice = document.createElement("p");
    const productCountContainer = document.createElement("div");
    const increaseProductCount = document.createElement("div");
    const productCount = document.createElement("div");
    const decreaseProductCount = document.createElement("div");
    const removeProductButton = document.createElement("div");

    cartProduct.className = "cart-product";
    productImgContainer.className = "product-img-container";
    cartProductImg.className = "cart-product-img";
    cartProductTitle.className = "cart-product-title";
    cartPriceContainer.className = "cart-price-container";
    cartProductPrice.className = "price";
    cartProductDiscPrice.className = "discounted-price";
    productCountContainer.className = "product-count-container";
    increaseProductCount.className = "increase-product-count";
    increaseProductCount.id = "increase-product-count";
    productCount.className = "product-count";
    productCount.id = "product-count";
    decreaseProductCount.className = "decrease-product-count";
    decreaseProductCount.id = "decrease-product-count";
    removeProductButton.className = "remove-product";
    removeProductButton.id = "remove-product";

    let cartItemCount = JSON.parse(localStorage.getItem("cart"));
    cartItemCount = cartItemCount.filter((cart) => cart.title == product.title);
    cartItemCount = cartItemCount[0].quantity;

    cartProductImg.setAttribute("src", product.image);
    cartProductTitle.innerText = product.title;
    cartProductPrice.innerText =
      (product.price * cartItemCount).toFixed(2) + " kr";
    cartProductDiscPrice.innerText =
      (product.discountedPrice * cartItemCount).toFixed(2) + " kr";
    increaseProductCount.innerText = "+";
    productCount.innerText = cartItemCount;
    decreaseProductCount.innerText = "-";
    removeProductButton.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z" fill="black"/></svg>';

    document.querySelector("#cart-items").appendChild(cartProduct);
    cartProduct.appendChild(productImgContainer);
    productImgContainer.appendChild(cartProductImg);
    cartProduct.appendChild(cartProductTitle);
    cartProduct.appendChild(cartPriceContainer);
    cartPriceContainer.appendChild(cartProductPrice);
    cartPriceContainer.appendChild(cartProductDiscPrice);
    cartProduct.appendChild(productCountContainer);
    productCountContainer.appendChild(decreaseProductCount);
    productCountContainer.appendChild(productCount);
    productCountContainer.appendChild(increaseProductCount);
    cartProduct.appendChild(removeProductButton);

    if (window.location.href.includes("Checkout")) {
      document
        .querySelector("#checkout-cart-items")
        .appendChild(cartProduct.cloneNode(true));
    }

    if (cartProductPrice.innerText !== cartProductDiscPrice.innerText) {
      cartProductDiscPrice.style.display = "block";
      cartProductPrice.style.textDecoration = "line-through";
    }

    //remove product from cart
    removeProductButton.addEventListener("click", function removeProduct() {
      cartProduct.remove();

      let updatedCart = JSON.parse(localStorage.getItem("cart"));

      updatedCart = updatedCart.filter((cart) => cart.title != product.title);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      //Update cart total
      updateCartTotal();

      //update cart count
      updateCartCount();

      // render empty cart message when removing last item in cart
      if (localStorage.getItem("cart") == "[]") {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.innerText =
          "There are currently no items in your cart.";
        emptyCartMessage.className = "empty-cart";
        document.querySelector(".cart-total").style.display = "none";

        if (window.location.href.includes("Checkout")) {
          document
            .querySelector("#checkout-cart-items")
            .appendChild(emptyCartMessage);
        } else {
          document.querySelector("#cart-items").appendChild(emptyCartMessage);
        }
      } else {
      }
    });

    // increase the number of a product in the cart
    increaseProductCount.addEventListener("click", function something() {
      productCount.innerText++;

      let updatedCart = JSON.parse(localStorage.getItem("cart"));

      updatedCart.forEach((item) => {
        if (item.id === product.id) {
          item.quantity++;
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      });

      //update price within cart when increasing amount of products
      let increaseCartItemCount = JSON.parse(localStorage.getItem("cart"));
      increaseCartItemCount = increaseCartItemCount.filter(
        (cart) => cart.title == product.title
      );
      increaseCartItemCount = increaseCartItemCount[0].quantity;

      let increaseItemPrice = JSON.parse(localStorage.getItem("cart"));
      increaseItemPrice = increaseItemPrice.filter(
        (cart) => cart.price == product.price
      );
      increaseItemPrice = increaseItemPrice[0].price * increaseCartItemCount;

      cartProductPrice.innerText = increaseItemPrice.toFixed(2) + " kr";

      let increaseItemDiscPrice = JSON.parse(localStorage.getItem("cart"));
      increaseItemDiscPrice = increaseItemDiscPrice.filter(
        (cart) => cart.discountedPrice == product.discountedPrice
      );
      increaseItemDiscPrice =
        increaseItemDiscPrice[0].discountedPrice * increaseCartItemCount;

      cartProductDiscPrice.innerText = increaseItemDiscPrice.toFixed(2) + " kr";

      //Update cart total
      updateCartTotal();

      //update cart count
      updateCartCount();
    });

    //decrese the number of a product in the cart
    decreaseProductCount.addEventListener("click", function something() {
      // Keep cart product count from going below one
      if (productCount.innerText <= 1) {
        cartProductPrice.innerText = product.price + " kr";
        cartProductDiscPrice.innerText = product.discountedPrice + " kr";

        let updatedCart = JSON.parse(localStorage.getItem("cart"));
        updatedCart.forEach((item) => {
          if (item.id === product.id) {
            item.quantity = 1;
          }
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        });
      } else {
        productCount.innerText--;

        let updatedCart = JSON.parse(localStorage.getItem("cart"));

        updatedCart.forEach((item) => {
          if (item.id === product.id) {
            item.quantity--;
          }
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        });

        //update price within cart when decreasing amount of products
        let decreaseCartItemCount = JSON.parse(localStorage.getItem("cart"));
        decreaseCartItemCount = decreaseCartItemCount.filter(
          (cart) => cart.title == product.title
        );
        decreaseCartItemCount = decreaseCartItemCount[0].quantity;

        let decreaseItemPrice = JSON.parse(localStorage.getItem("cart"));
        decreaseItemPrice = decreaseItemPrice.filter(
          (cart) => cart.price == product.price
        );
        decreaseItemPrice = decreaseItemPrice[0].price * decreaseCartItemCount;

        cartProductPrice.innerText = decreaseItemPrice.toFixed(2) + " kr";

        let decreaseItemDiscPrice = JSON.parse(localStorage.getItem("cart"));
        decreaseItemDiscPrice = decreaseItemDiscPrice.filter(
          (cart) => cart.discountedPrice == product.discountedPrice
        );
        decreaseItemDiscPrice =
          decreaseItemDiscPrice[0].discountedPrice * decreaseCartItemCount;

        cartProductDiscPrice.innerText =
          decreaseItemDiscPrice.toFixed(2) + " kr";

        //Update cart total
        updateCartTotal();

        //update cart count
        updateCartCount();
      }
    });
  });
}

export function displayCartTotal() {
  let individualProductTotal = [];
  let cartTotal = JSON.parse(localStorage.getItem("cart"));
  cartTotal.forEach((product) => {
    individualProductTotal.push(product.discountedPrice * product.quantity);
  });

  cartTotal = individualProductTotal.reduce((a, b) => a + b, 0);

  const totalText = document.createElement("p");
  const totalAmount = document.createElement("p");

  totalAmount.className = "total-amount";
  totalAmount.innerText = cartTotal.toFixed(2) + " kr";

  totalText.innerText = "Total";

  document.querySelector(".cart-total").appendChild(totalText);
  document.querySelector(".cart-total").appendChild(totalAmount);

  if (window.location.href.includes("Checkout")) {
    document
      .querySelector("#checkout-cart-total")
      .appendChild(totalText.cloneNode(true));
    document
      .querySelector("#checkout-cart-total")
      .appendChild(totalAmount.cloneNode(true));
  }
}

export function updateCartTotal() {
  let individualProductTotal = [];
  let newCartTotal = JSON.parse(localStorage.getItem("cart"));
  newCartTotal.forEach((product) => {
    individualProductTotal.push(product.discountedPrice * product.quantity);
  });

  newCartTotal = individualProductTotal.reduce((a, b) => a + b, 0);

  document.querySelector(".total-amount").innerText =
    newCartTotal.toFixed(2) + " kr";
}
