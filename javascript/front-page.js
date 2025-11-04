import {
  cartFunctions,
  displayLoggedIn,
  profile,
  updateCartCount,
} from "./header.mjs";
import {
  displayCartItems,
  displayCartTotal,
  updateCartTotal,
} from "./cart.mjs";
import { displayProducts } from "./display-products.mjs";
import { displayCarouselItmes } from "./display-carousel-items.mjs";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

let allProducts = [];
let carouselProducts = [];
let productTags = [];
let selectedTag = [];
let filteredProducts = [];

if (JSON.parse(localStorage.getItem("login") == null)) {
  localStorage.setItem("login", "false");
}

let cartItems = JSON.parse(localStorage.getItem("cart"));

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    allProducts = data.data;
    carouselProducts = allProducts.slice(0, 3);

    displayCarouselItmes(carouselProducts);
    getProductTags(allProducts);
    productFilter(productTags);
    openAndCloseFilters();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();
displayLoggedIn();
profile();
cartFunctions();
updateCartCount();
displayCartTotal();
updateCartTotal();
displayCartItems(cartItems);

function getProductTags() {
  allProducts.forEach((product) => {
    productTags.push(product.tags);
  });

  productTags = productTags.flat(1);
  productTags = new Set(productTags);

  productTags = Array.from(productTags);
  productTags = productTags.sort();
}

function openAndCloseFilters() {
  document
    .querySelector("#open-filters")
    .addEventListener("click", function showHideFilters() {
      if (document.querySelector("#open-filters").innerText === "+ Filters") {
        document.querySelector(".filters").style.height = "min-content";
        document.querySelector("#open-filters").innerText = "- Filters";
      } else {
        document.querySelector(".filters").style.height = "0px";
        document.querySelector("#open-filters").innerText = "+ Filters";
        const list = document.querySelectorAll(".product-link");

        //When closing the filters all products are displayed again.
        for (const element of list) {
          element.remove();
        }
        displayProducts(allProducts);
      }
    });
}

function productFilter(tags) {
  tags.forEach((tag) => {
    // Create product filters
    const filter = document.createElement("p");
    filter.className = "filter";
    filter.id = "#filter";
    filter.innerText = tag;
    document.querySelector("#filters").appendChild(filter);

    filter.addEventListener("click", () => {
      const list = document.querySelectorAll(".product-link");
      for (const element of list) {
        //remove previous renderedfilms when filter is selected
        element.remove();
      }

      // Display filtered products
      filteredProducts = allProducts.filter((product) =>
        product.tags.includes(tag)
      );

      displayProducts(filteredProducts);
    });
  });
  if (selectedTag.length == 0) {
    displayProducts(allProducts);
  }
}
