export function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    const productImg = document.createElement("img");
    const productTextContainer = document.createElement("div");
    const productTitle = document.createElement("h2");
    const productPrice = document.createElement("p");
    const productDiscountedPrice = document.createElement("p");
    const anchor = document.createElement("a");

    productImg.setAttribute("src", product.image.url);
    productTitle.textContent = product.title;
    productPrice.textContent = product.price + " kr";
    productDiscountedPrice.textContent = product.discountedPrice + " kr";
    anchor.href = `product/index.html`;

    productCard.className = "product-card";
    productImg.className = "product-img";
    productTextContainer.className = "product-text";
    productPrice.className = "price";
    productDiscountedPrice.className = "discounted-price";
    anchor.className = "product-link";

    document.querySelector("#product-cards").appendChild(anchor);
    anchor.appendChild(productCard);
    productCard.appendChild(productImg);
    productCard.appendChild(productTextContainer);
    productTextContainer.appendChild(productTitle);
    productTextContainer.appendChild(productPrice);
    productTextContainer.appendChild(productDiscountedPrice);

    if (productPrice.innerText !== productDiscountedPrice.innerText) {
      productDiscountedPrice.style.display = "block";
      productPrice.style.textDecoration = "line-through";
    }
  });
}
