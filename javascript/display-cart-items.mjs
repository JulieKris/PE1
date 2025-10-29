if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

let cartItems = JSON.parse(localStorage.getItem("cart"));

const ids = cartItems.map(({ id }) => id);
const noDuplicateItems = cartItems.filter(
  ({ id }, index) => !ids.includes(id, index + 1)
);

export function displayCartItems(Items) {
  Items.forEach((item) => {
    const cartProduct = document.createElement("div");
    const cartProductImg = document.createElement("img");
    const cartProductTitle = document.createElement("p");
    const cartPriceContainer = document.createElement("div");
    const cartProductPrice = document.createElement("p");
    const cartProductDiscPrice = document.createElement("p");
    const productTotalPrice = document.createElement("p");
    const productCountContainer = document.createElement("div");
    const increaseProductCount = document.createElement("div");
    const productCount = document.createElement("div");
    const decreaseProductCount = document.createElement("div");

    cartProduct.className = "cart-product";
    cartProductTitle.className = "cart-product-title";
    cartPriceContainer.className = "cart-price-container";
    cartProductPrice.className = "price";
    cartProductDiscPrice.className = "discounted-price";
    productCountContainer.className = "product-count-container";
    increaseProductCount.className = "increase-product-count";
    increaseProductCount.id = "increase-product-count";
    productCount.className = "product-count";
    decreaseProductCount.className = "decrease-product-count";
    decreaseProductCount.id = "decrease-product-count";

    cartProductImg.setAttribute("src", item.image);
    cartProductTitle.innerText = item.title;
    cartProductPrice.innerText = item.price + " kr";
    cartProductDiscPrice.innerText = item.discountedPrice + " kr";
    increaseProductCount.innerText = "+";
    productCount.innerText = "0";
    decreaseProductCount.innerText = "-";

    document.querySelector("#cart-items").appendChild(cartProduct);
    if (window.location.href.includes("Checkout")) {
      document.querySelector("#checkout-cart-items").appendChild(cartProduct);
    }
    cartProduct.appendChild(cartProductImg);
    cartProduct.appendChild(cartProductTitle);
    cartProduct.appendChild(cartPriceContainer);
    cartPriceContainer.appendChild(cartProductPrice);
    cartPriceContainer.appendChild(cartProductDiscPrice);
    cartProduct.appendChild(productTotalPrice);
    cartProduct.appendChild(productCountContainer);
    productCountContainer.appendChild(decreaseProductCount);
    productCountContainer.appendChild(productCount);
    productCountContainer.appendChild(increaseProductCount);

    if (cartProductPrice.innerText !== cartProductDiscPrice.innerText) {
      cartProductDiscPrice.style.display = "block";
      cartProductPrice.style.textDecoration = "line-through";
    }

    document
      .querySelector("#increase-product-count")
      .addEventListener("click", function something() {
        let productCount = document.querySelector("");
      });

    document.querySelector("#decrease-product-count");
  });
}

export function getProductCount(items) {
  items.forEach((item) => {
    const title = items.map(({ title }) => title);

    console.log(title);

    let val;
    let countVal = {};
    for (val of title) {
      if (countVal[val]) {
        countVal[val] += 1;
      } else {
        countVal[val] = 1;
      }
    }

    console.log(countVal);

    console.log(Object.values(countVal));
  });
}

getProductCount(cartItems);
