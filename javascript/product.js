import { displayProducts } from "./display-products.mjs";
import { cartFunctions } from "./header.mjs";
import { displayCartItems, displayCartTotal } from "./cart.mjs";

let image;
let title;
let description;
let price;
let discountedPrice;
let rating;
let reviews;
let id;

let allProducts = [];
let randomProducts = [];

let cartItems = JSON.parse(localStorage.getItem("cart"));

const ids = cartItems.map(({ id }) => id);
let noDuplicateItems = cartItems.filter(
  ({ id }, index) => !ids.includes(id, index + 1)
);

if (localStorage.getItem("cart") == null) {
  localStorage.setItem("cart", "[]");
}

const apiUrl = "https://v2.api.noroff.dev/online-shop";

async function fetchProduct() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    allProducts = data.data;

    const params = new URLSearchParams(window.location.search);
    id = params.get("id");
    const productResponse = await fetch(`${apiUrl}/${id}`);
    const productData = await productResponse.json();

    image = productData.data.image.url;
    title = productData.data.title;
    description = productData.data.description;
    price = productData.data.price;
    discountedPrice = productData.data.discountedPrice;
    rating = productData.data.rating;
    reviews = productData.data.reviews;

    renderProductInfo();
    displayProducts(allProducts);
    displayCartItems(noDuplicateItems);
    addToCart();

    document.querySelector("#cart-count").innerText = JSON.parse(
      localStorage.getItem("cart")
    ).length;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

function renderProductInfo() {
  document.title = title + " | HopShop";

  /*Product Image*/
  const productImgContainer = document.createElement("div");
  const productImg = document.createElement("img");
  productImgContainer.className = "product-image-container";
  productImg.setAttribute("src", image);
  document.querySelector("#product-container").appendChild(productImgContainer);
  productImgContainer.appendChild(productImg);

  /*Container for all product details*/
  const productDetails = document.createElement("div");
  productDetails.className = "product-details";
  document.querySelector("#product-container").appendChild(productDetails);

  /*Container for the title, description and price of the product*/
  const productInfo = document.createElement("div");
  productInfo.className = "product-info";
  productDetails.appendChild(productInfo);

  /*Product title*/
  const productTitle = document.createElement("h1");
  productTitle.innerText = title;
  productInfo.appendChild(productTitle);

  /*Product description*/
  const productDescription = document.createElement("p");
  productDescription.className = "product-description";
  productDescription.innerText = description;
  productInfo.appendChild(productDescription);

  /*Container for the price*/
  const priceContainer = document.createElement("div");
  priceContainer.className = "price-container";
  productInfo.appendChild(priceContainer);

  /*Product price*/
  const productPrice = document.createElement("p");
  productPrice.className = "price";
  productPrice.id = "price";
  productPrice.innerText = price + " kr";
  priceContainer.appendChild(productPrice);

  /*Product discounted price*/
  const productDiscountedPrice = document.createElement("p");
  productDiscountedPrice.className = "discounted-price";
  productDiscountedPrice.id = "discounted-price";
  productDiscountedPrice.innerText = discountedPrice + " kr";
  priceContainer.appendChild(productDiscountedPrice);

  /*Display discounted price*/
  if (productPrice.innerText !== productDiscountedPrice.innerText) {
    productDiscountedPrice.style.display = "block";
    productPrice.style.textDecoration = "line-through";
  }

  /*Container for the add to cart and wishlist buttons*/
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  productInfo.appendChild(buttonContainer);

  /*Add to cart button*/
  const addToCartButton = document.createElement("button");
  addToCartButton.id = "add-to-cart";
  addToCartButton.innerText = "Add to cart";
  buttonContainer.appendChild(addToCartButton);

  /*Wishlist button*/
  const wishlistButton = document.createElement("div");
  wishlistButton.className = "wishlist-button";
  buttonContainer.appendChild(wishlistButton);
  wishlistButton.innerHTML =
    '<svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29 2C34.0401 2 38 5.96871 38 11.0898C38 14.2491 36.6085 17.2693 33.7588 20.7842C30.8856 24.328 26.7392 28.1285 21.5488 32.8838L20.0049 34.29L18.4521 32.8652L18.4492 32.8623C13.2593 28.1176 9.11293 24.3221 6.24023 20.7812C3.39104 17.2693 2 14.249 2 11.0898C2.00004 5.96871 5.95991 2 11 2C13.8683 2 16.6567 3.35623 18.4717 5.50488L20 7.31348L21.5283 5.50488C23.3433 3.35623 26.1317 2 29 2Z" stroke="#255EED" stroke-width="4"/></svg>';

  /*Rating container*/
  const ratingContainer = document.createElement("div");
  ratingContainer.className = "rating-container";
  productDetails.appendChild(ratingContainer);

  /*Rating heading*/
  const ratingHeading = document.createElement("h2");
  ratingHeading.innerText = "User rating";
  ratingContainer.appendChild(ratingHeading);

  /*Product rating*/
  const productRating = document.createElement("div");
  const numberRating = document.createElement("p");
  const productRatingStarsOuter = document.createElement("div");
  const productRatingStarsInner = document.createElement("div");
  productRating.className = "product-rating";
  productRatingStarsOuter.className = "user-rating-stars-outer";
  productRatingStarsInner.className = "user-rating-stars-inner";
  numberRating.innerText = rating;
  ratingContainer.appendChild(productRating);
  productRating.appendChild(productRatingStarsOuter);
  productRatingStarsOuter.appendChild(productRatingStarsInner);
  productRating.appendChild(numberRating);

  let starRating = rating * 10 * 2;

  productRatingStarsInner.style.width = starRating + "%";

  /*Reviews container*/
  const reviewsContainer = document.createElement("div");
  productDetails.appendChild(reviewsContainer);

  /*Reviews heading*/
  const reviewsHeading = document.createElement("h2");
  reviewsHeading.innerText = "User reviews";
  reviewsContainer.appendChild(reviewsHeading);

  /*Product reviews*/
  const productReviews = document.createElement("div");
  productReviews.className = "reviews";
  reviewsContainer.appendChild(productReviews);

  const noReviewsMessage = document.createElement("p");
  noReviewsMessage.classList = "no-reviews";
  noReviewsMessage.innerText = "There are no user reviews for this product.";
  reviewsContainer.appendChild(noReviewsMessage);

  /*If there are no reviews display message*/
  if (reviews.length === 0) {
    noReviewsMessage.style.display = "block";
  }

  /*Rendering individual reviews*/
  reviews.forEach((review) => {
    let starRating = review.rating * 10 * 2;
    const productReview = document.createElement("div");
    const reviewUserName = document.createElement("p");
    const reviewDescription = document.createElement("p");
    const reviewStarsOuter = document.createElement("div");
    const reviewStarsInner = document.createElement("div");

    reviewUserName.innerText = review.username;
    reviewDescription.innerText = review.description;

    productReview.className = "review";
    reviewUserName.className = "username";
    reviewStarsOuter.className = "review-stars-outer";
    reviewStarsInner.className = "review-stars-inner";

    productReviews.appendChild(productReview);
    productReview.appendChild(reviewUserName);
    productReview.appendChild(reviewDescription);
    productReview.appendChild(reviewStarsOuter);
    reviewStarsOuter.appendChild(reviewStarsInner);

    reviewStarsInner.style.width = starRating + "%";
  });
}

fetchProduct();
displayCartTotal();
cartFunctions();

/*Add product to cart*/
function addToCart() {
  document
    .querySelector("#add-to-cart")
    .addEventListener("click", function addToCart() {
      if (
        JSON.parse(localStorage.getItem("cart")).some(
          (e) => e.title === title
        ) === false
      ) {
        let item = {
          image: image,
          title: title,
          price: price,
          discountedPrice: discountedPrice,
          id: id,
          quantity: 1,
        };

        let updatedCart = JSON.parse(localStorage.getItem("cart"));
        updatedCart.push(item);

        localStorage.setItem("cart", JSON.stringify(updatedCart));

        document.querySelector("#cart-count").innerText = JSON.parse(
          localStorage.getItem("cart")
        ).length;

        const ids = updatedCart.map(({ id }) => id);
        let reloadCart = updatedCart.filter(
          ({ id }, index) => !ids.includes(id, index + 1)
        );

        document.querySelector("#cart-items").innerHTML = "";
        displayCartItems(reloadCart);

        //Update cart total
        let individualProductTotal = [];
        let newCartTotal = JSON.parse(localStorage.getItem("cart"));
        newCartTotal.forEach((product) => {
          individualProductTotal.push(
            product.discountedPrice * product.quantity
          );
        });

        newCartTotal = individualProductTotal.reduce((a, b) => a + b, 0);

        document.querySelector(".total-amount").innerText =
          newCartTotal.toFixed(2) + " kr";
      } else {
        alert("already added to cart");
      }
    });
}
