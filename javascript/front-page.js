import { cartFunctions } from "./header.mjs";
import { displayCartItems, displayCartTotal } from "./cart.mjs";
import { displayProducts } from "./display-products.mjs";
import { displayCarouselItmes } from "./display-carousel-items.mjs";

const apiUrl = "https://v2.api.noroff.dev/online-shop";

let allProducts = [];
let carouselProducts = [];
let productTags = [];
let selectedTag = [];
let filteredProducts = [];

let cartItems = JSON.parse(localStorage.getItem("cart"));

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    allProducts = data.data;
    carouselProducts = allProducts.slice(0, 4);

    displayCarouselItmes(carouselProducts);
    getProductTags(allProducts);
    productFilter(productTags);
    openAndCloseFilters();

    document.querySelector("#cart-count").innerText = JSON.parse(
      localStorage.getItem("cart")
    ).length;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();
cartFunctions();
displayCartTotal();
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
      }
    });
}

function productFilter(tags) {
  tags.forEach((tag) => {
    const filter = document.createElement("p");
    filter.className = "filter";
    filter.id = "#filter";
    filter.innerText = tag;
    document.querySelector("#filters").appendChild(filter);

    filter.addEventListener("click", () => {
      const list = document.querySelectorAll(".product-link");
      for (const element of list) {
        //remove previous renderedfilms when new option is selected
        element.remove();
      }
      if (selectedTag.length == 0) {
        selectedTag.push(filter.innerText);
        filter.style.backgroundColor = "var(--blue)";
        filter.style.color = "white";
      } else {
        if (selectedTag.includes(filter.innerText)) {
          selectedTag.forEach((tag, tagx) => {
            if (tag == filter.innerText) {
              selectedTag.splice(tagx, 1);
              filter.style.backgroundColor = "var(--light-green)";
              filter.style.color = "black";
            }
          });
        } else {
          selectedTag.push(filter.innerText);
          filter.style.backgroundColor = "var(--blue)";
          filter.style.color = "white";
        }
      }

      allProducts.forEach((product) => {
        if (product.tags.includes(tag)) {
          if (filteredProducts.length === 0) {
            filteredProducts.push(product);
          } else {
            if (filteredProducts.includes(product)) {
              console.log("heeeeeelp");
              //filteredProducts.forEach((product, productx) => {
              //if (product.tags.includes(tag)) {
              //filteredProducts.splice(product.tags);
              //}
              //});
            } else {
              filteredProducts.push(product);
            }
          }
        }
      });
      filteredProducts = new Set(filteredProducts);
      filteredProducts = Array.from(filteredProducts);
      displayProducts(filteredProducts);
      console.log(filteredProducts);
    });
  });
  if (selectedTag.length == 0) {
    console.log("no filters selected");
    displayProducts(allProducts);
  }
}
