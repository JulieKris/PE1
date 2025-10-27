export function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    const productImg = document.createElement("img");
    const productTitle = document.createElement("h3");
    const productPrice = document.createElement("p");
    const productDiscountedPrice = document.createElement("p");
    const anchor = document.createElement("a");

    productImg.setAttribute("src", product.image.url);
    productTitle.textContent = product.title;
    productPrice.textContent = product.price + " NOK";
    productDiscountedPrice.textContent = product.discountedPrice + " NOK";
    anchor.href = `/product/index.html?id=${product.id}`;

    productCard.className = "product-card";
    productImg.className = "product-img";
    productPrice.className = "price";
    productDiscountedPrice.className = "discounted-price";
    anchor.className = "product-link";

    document.querySelector("#product-cards").appendChild(anchor);
    anchor.appendChild(productCard);
    productCard.appendChild(productImg);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDiscountedPrice);

    if (productPrice.innerText !== productDiscountedPrice.innerText) {
      productDiscountedPrice.style.display = "block";
      productPrice.style.textDecoration = "line-through";
    }
  });
}
