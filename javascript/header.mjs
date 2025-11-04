export function cartFunctions() {
  const open = document.querySelector("#cart-icon");
  const close = document.querySelector("#cart-close");

  open.addEventListener("click", function openMenu() {
    document.querySelector(".cart-container").style.width = "600px";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });

  close.addEventListener("click", function closeMenu() {
    document.querySelector(".cart-container").style.width = "0px";
  });

  document
    .querySelector("#checkout-button")
    .addEventListener("click", function goToCheckout() {
      if (JSON.parse(localStorage.getItem("login")) == false) {
        alert("Please login first.");
      } else {
        window.location.replace(
          window.location.origin + "/checkout/index.html"
        );
      }
    });
}

export function profile() {
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
      .querySelector("#profile-close")
      .addEventListener("click", function closeProfileMenu() {
        document.querySelector(".profile-container").style.width = "0px";
      });
  }
}

export function updateCartCount() {
  let individualProductCount = [];
  let newCartCount = JSON.parse(localStorage.getItem("cart"));
  newCartCount.forEach((product) => {
    individualProductCount.push(product.quantity);
  });

  newCartCount = individualProductCount.reduce((a, b) => a + b, 0);

  document.querySelector("#cart-count").innerText = newCartCount;
}

export function displayLoggedIn() {
  if (JSON.parse(localStorage.getItem("login")) == true) {
    document.querySelector("#profile-link").style.display = "block";
    document.querySelector("#register-link").style.display = "none";
    document.querySelector("#login-link").style.display = "none";
  } else {
    document.querySelector("#profile-link").style.display = "none";
    document.querySelector("#register-link").style.display = "block";
    document.querySelector("#login-link").style.display = "block";
  }
}
