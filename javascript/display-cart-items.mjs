if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

let cartItems = JSON.parse(localStorage.getItem("cart"));

const ids = cartItems.map(({ id }) => id);
const noDuplicateItems = cartItems.filter(
  ({ id }, index) => !ids.includes(id, index + 1)
);

export function displayCartItems(products) {
  if (localStorage.getItem("cart") == "[]") {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.innerText = "There are currently no items in your cart.";
    emptyCartMessage.className = "empty-cart";

    if (window.location.href.includes("Checkout")) {
      document
        .querySelector("#checkout-cart-items")
        .appendChild(emptyCartMessage);
    } else {
      document.querySelector("#cart-items").appendChild(emptyCartMessage);
    }
    console.log("huh");
  } else {
  }

  products.forEach((product) => {
    const cartProduct = document.createElement("div");
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

    cartProductImg.setAttribute("src", product.image);
    cartProductTitle.innerText = product.title;
    cartProductPrice.innerText = product.price + " kr";
    cartProductDiscPrice.innerText = product.discountedPrice + " kr";
    increaseProductCount.innerText = "+";
    productCount.innerText = "1";
    decreaseProductCount.innerText = "-";
    removeProductButton.innerText = "X";

    if (window.location.href.includes("Checkout")) {
      document.querySelector("#checkout-cart-items").appendChild(cartProduct);
    } else {
      document.querySelector("#cart-items").appendChild(cartProduct);
    }

    cartProduct.appendChild(cartProductImg);
    cartProduct.appendChild(cartProductTitle);
    cartProduct.appendChild(cartPriceContainer);
    cartPriceContainer.appendChild(cartProductPrice);
    cartPriceContainer.appendChild(cartProductDiscPrice);
    cartProduct.appendChild(productCountContainer);
    productCountContainer.appendChild(decreaseProductCount);
    productCountContainer.appendChild(productCount);
    productCountContainer.appendChild(increaseProductCount);
    cartProduct.appendChild(removeProductButton);

    if (cartProductPrice.innerText !== cartProductDiscPrice.innerText) {
      cartProductDiscPrice.style.display = "block";
      cartProductPrice.style.textDecoration = "line-through";
    }

    console.log(cartItems.length);

    let item = {
      image: product.image,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      id: product.id,
    };

    removeProductButton.addEventListener("click", function removeProduct() {
      cartProduct.remove();

      let updatedCart = JSON.parse(localStorage.getItem("cart"));
      console.log(updatedCart);

      updatedCart = updatedCart.filter((cart) => cart.title != product.title);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      document.querySelector("#cart-count").innerText = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    });

    increaseProductCount.addEventListener("click", function something() {
      productCount.innerText++;

      console.log(product.id);

      let updatedCart = JSON.parse(localStorage.getItem("cart"));
      updatedCart.push(item);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      document.querySelector("#cart-count").innerText = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    });

    decreaseProductCount.addEventListener("click", function something() {
      productCount.innerText--;

      let updatedCart = JSON.parse(localStorage.getItem("cart"));
      updatedCart = updatedCart.splice(updatedCart.indexOf(product.title), 1);

      console.log(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      document.querySelector("#cart-count").innerText = JSON.parse(
        localStorage.getItem("cart")
      ).length;
    });
  });
}
