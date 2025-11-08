import { displayLoggedIn, profile, updateCartCount } from "./header.mjs";
import { displayCartItems, displayCartTotal } from "./cart.mjs";

let cartItems = JSON.parse(localStorage.getItem("cart"));

displayLoggedIn();
profile();
updateCartCount();
displayCartTotal();

try {
  displayCartItems(cartItems);
} catch (error) {
  document.querySelector(".cart-error-msg").style.display = "block";
} finally {
  document.querySelector(".cart-loader").style.display = "none";
}

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const telephoneNumber = document.querySelector("#telephone-number");
const streetname = document.querySelector("#streetname");
const postalCode = document.querySelector("#postal-code");
const city = document.querySelector("#city");
const cardNumber = document.querySelector("#card-number");
const expiryDate = document.querySelector("#expiry-date");
const cvc = document.querySelector("#cvc");
const bippsNumber = document.querySelector("#bipps-number");

//checkout form check
document
  .querySelector("#checkout-button")
  .addEventListener("click", function checkout() {
    if (firstName.value == 0) {
      document.querySelector("#first-name-error").innerText =
        "Please input first name.";
      firstName.style.borderColor = "red";
      document.querySelector("#first-name-error").style.display = "block";
    } else {
      firstName.style.borderColor = "black";
      document.querySelector("#first-name-error").style.display = "none";
      if (lastName.value == 0) {
        document.querySelector("#last-name-error").innerText =
          "Please input last name.";
        lastName.style.borderColor = "red";
        document.querySelector("#last-name-error").style.display = "block";
      } else {
        lastName.style.borderColor = "black";
        document.querySelector("#last-name-error").style.display = "none";
        if (email.value == 0) {
          document.querySelector("#email-error").innerText =
            "Please input email.";
          email.style.borderColor = "red";
          document.querySelector("#email-error").style.display = "block";
        } else {
          if (!email.value.includes("@" && ".")) {
            document.querySelector("#email-error").innerText =
              "Email is not valid.";
            email.style.borderColor = "red";
            document.querySelector("#email-error").style.display = "block";
          } else {
            email.style.borderColor = "black";
            document.querySelector("#email-error").style.display = "none";
            if (telephoneNumber.value == 0) {
              document.querySelector("#telephone-number-error").innerText =
                "Please input telephone number.";
              telephoneNumber.style.borderColor = "red";
              document.querySelector("#telephone-number-error").style.display =
                "block";
            } else {
              telephoneNumber.style.borderColor = "black";
              document.querySelector("#telephone-number-error").style.display =
                "none";
              if (streetname.value == 0) {
                document.querySelector("#streetname-error").innerText =
                  "Please input streetname.";
                streetname.style.borderColor = "red";
                document.querySelector("#streetname-error").style.display =
                  "block";
              } else {
                streetname.style.borderColor = "black";
                document.querySelector("#streetname-error").style.display =
                  "none";
                if (postalCode.value == 0) {
                  document.querySelector("#postal-code-error").innerText =
                    "Please input postal code.";
                  postalCode.style.borderColor = "red";
                  document.querySelector("#postal-code-error").style.display =
                    "block";
                } else {
                  postalCode.style.borderColor = "black";
                  document.querySelector("#postal-code-error").style.display =
                    "none";
                  if (city.value == 0) {
                    document.querySelector("#city-error").innerText =
                      "Please input city.";
                    city.style.borderColor = "red";
                    document.querySelector("#city-error").style.display =
                      "block";
                  } else {
                    city.style.borderColor = "black";
                    document.querySelector("#city-error").style.display =
                      "none";
                    if (
                      document.querySelector(".bipps-payment").style.display ==
                      "block"
                    ) {
                      if (bippsNumber.value == 0) {
                        document.querySelector(
                          "#bipps-number-error"
                        ).innerText = "Please input telephone number.";
                        bippsNumber.style.borderColor = "red";
                        document.querySelector(
                          "#bipps-number-error"
                        ).style.display = "block";
                      } else {
                        sessionStorage.setItem("customer", firstName.value);
                        window.location.href = "../checkout-success/index.html";
                      }
                    } else {
                      if (cardNumber.value == 0) {
                        document.querySelector("#card-number-error").innerText =
                          "Please input card number.";
                        cardNumber.style.borderColor = "red";
                        document.querySelector(
                          "#card-number-error"
                        ).style.display = "block";
                      } else {
                        cardNumber.style.borderColor = "black";
                        document.querySelector(
                          "#card-number-error"
                        ).style.display = "none";
                        if (expiryDate.value == 0) {
                          document.querySelector(
                            "#expiry-date-error"
                          ).innerText = "Please input card number.";
                          expiryDate.style.borderColor = "red";
                          document.querySelector(
                            "#expiry-date-error"
                          ).style.display = "block";
                        } else {
                          expiryDate.style.borderColor = "black";
                          document.querySelector(
                            "#expiry-date-error"
                          ).style.display = "none";
                          if (cvc.value == 0) {
                            document.querySelector("#cvc-error").innerText =
                              "Please input card number.";
                            cvc.style.borderColor = "red";
                            document.querySelector("#cvc-error").style.display =
                              "block";
                          } else {
                            sessionStorage.setItem("customer", firstName.value);
                            window.location.href =
                              "../checkout-success/index.html";
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

//change displayed options depending on which payment option is selected.
const paymentOptions = document.querySelectorAll(
  'input[name="payment-options"]'
);

for (const paymentOption of paymentOptions) {
  paymentOption.addEventListener("change", showSelected);
}

function showSelected(e) {
  if (this.checked) {
    document.querySelector("#payment-options-error").style.display = "none";
    if (this.value == "bipps") {
      document.querySelector(".card-payment").style.display = "none";
      document.querySelector(".bipps-payment").style.display = "block";
    } else {
      document.querySelector(".card-payment").style.display = "block";
      document.querySelector(".bipps-payment").style.display = "none";
    }
  }
}
