import { displayProducts } from "./display-products.mjs";
import { cartFunctions, updateCartCount } from "./header.mjs";
import {
  displayCartItems,
  displayCartTotal,
  updateCartTotal,
} from "./cart.mjs";

let image;
let title;
let description;
let tags = [];
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
    tags = productData.data.tags;
    price = productData.data.price;
    discountedPrice = productData.data.discountedPrice;
    rating = productData.data.rating;
    reviews = productData.data.reviews;

    let recommendedProducts = allProducts.sort(() => Math.random() - 0.5);
    recommendedProducts = recommendedProducts.filter(
      (product) => product.title !== productData.data.title
    );
    recommendedProducts = recommendedProducts.slice(0, 8);

    renderProductInfo();
    displayProducts(recommendedProducts);
    displayCartItems(noDuplicateItems);
    addToCart();
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

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "tags-container";
  productDetails.appendChild(tagsContainer);

  const tagsHeading = document.createElement("p");
  tagsHeading.innerText = "Tags: ";
  tagsContainer.appendChild(tagsHeading);

  const productTags = document.createElement("p");
  productTags.innerText = tags.join(", ");
  productTags.className = "tags";
  tagsContainer.appendChild(productTags);
  console.log(tags);

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
  const shareButton = document.createElement("div");
  shareButton.className = "share-button";
  shareButton.id = "share-button";
  buttonContainer.appendChild(shareButton);
  shareButton.innerHTML =
    '<svg width="32" height="44" viewBox="0 0 40 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 10L26.45 13.55L22.475 9.575V37.5H17.525V9.575L13.55 13.55L10 10L20 0L30 10ZM40 22.5V50C40 52.75 37.75 55 35 55H5C2.225 55 0 52.75 0 50V22.5C0 19.725 2.225 17.5 5 17.5H12.5V22.5H5V50H35V22.5H27.5V17.5H35C37.75 17.5 40 19.725 40 22.5Z" fill="#255EED"/></svg>';

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
updateCartTotal();
updateCartCount();
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

        const ids = updatedCart.map(({ id }) => id);
        let reloadCart = updatedCart.filter(
          ({ id }, index) => !ids.includes(id, index + 1)
        );

        document.querySelector("#cart-items").innerHTML = "";
        displayCartItems(reloadCart);

        //Update cart total
        updateCartTotal();

        //update cart count
        updateCartCount();
      } else {
        alert("already added to cart");
      }
    });
}

function shareURL() {
  const shareURLcontainer = document.createElement("div");
  const shareableURL = document.createElement("input");
  const copyURL = document.createElement("button");
}
