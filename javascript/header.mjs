export function cartFunctions() {
  const open = document.querySelector("#cart-icon");
  const mobileCart = document.querySelector("#mobile-cart-icon");
  const close = document.querySelector("#cart-close");

  open.addEventListener("click", function openMenu() {
    document.querySelector(".cart-container").style.width = "600px";
  });

  mobileCart.addEventListener("click", function openCart() {
    document.querySelector(".cart-container").style.width = "100vw";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });

  //Checks if you're logged in and have items in your cart before you can go to checkout.
  document
    .querySelector("#checkout-button")
    .addEventListener("click", function goToCheckout() {
      if (JSON.parse(localStorage.getItem("login")) == false) {
        alert("Please login before proceeding to checkout.");
      } else {
        if (JSON.parse(localStorage.getItem("cart")).length == 0) {
          alert(
            "Please add an item to your cart before proceeding to checkout."
          );
        } else {
          window.location.replace(
            window.location.origin + "/checkout/index.html"
          );
        }
      }
    });
}

export function profile() {
  const mobileMenu = document.querySelector("#menu-icon");

  mobileMenu.addEventListener("click", function openMenu() {
    if (document.querySelector(".mobile-header-bottom").style.height == "0px") {
      document.querySelector(".mobile-header-bottom").style.height = "80px";
    } else {
      document.querySelector(".mobile-header-bottom").style.height = "0px";
    }
  });

  if (JSON.parse(localStorage.getItem("login")) == true) {
    document
      .querySelector("#profile-link")
      .addEventListener("click", function openProfileMenu() {
        document.querySelector(".profile-container").style.width = "300px";
      });

    document
      .querySelector("#logout-button")
      .addEventListener("click", function logout() {
        localStorage.setItem("login", "false");
        window.location.href = "../index.html";
      });

    document
      .querySelector("#mobile-logout")
      .addEventListener("click", function logout() {
        localStorage.setItem("login", "false");
        window.location.href = "../index.html";
      });

    document
      .querySelector("#profile-close")
      .addEventListener("click", function closeProfileMenu() {
        document.querySelector(".profile-container").style.width = "0px";
      });
  }
}

//updates the cart count in the header.
export function updateCartCount() {
  let individualProductCount = [];
  let newCartCount = JSON.parse(localStorage.getItem("cart"));
  newCartCount.forEach((product) => {
    individualProductCount.push(product.quantity);
  });

  newCartCount = individualProductCount.reduce((a, b) => a + b, 0);

  document.querySelector("#cart-count").innerText = newCartCount;
  document.querySelector("#mobile-cart-count").innerText = newCartCount;
}

//changes which links are displayed in the header whether you are logged in or not.
export function displayLoggedIn() {
  if (JSON.parse(localStorage.getItem("login")) == true) {
    document.querySelector("#profile-link").style.display = "block";
    document.querySelector("#register-link").style.display = "none";
    document.querySelector("#login-link").style.display = "none";

    document.querySelector(".mobile-logged-in").style.display = "flex";
    document.querySelector(".mobile-logged-out").style.display = "none";
  } else {
    document.querySelector("#profile-link").style.display = "none";
    document.querySelector("#register-link").style.display = "block";
    document.querySelector("#login-link").style.display = "block";

    document.querySelector(".mobile-logged-in").style.display = "none";
    document.querySelector(".mobile-logged-out").style.display = "flex";
  }
}
