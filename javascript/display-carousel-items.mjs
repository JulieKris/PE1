var number = 1;

export function displayCarouselItmes(products) {
  products.forEach((product) => {
    const carouselSlide = document.createElement("div");
    const carouselText = document.createElement("div");
    const carouselHeader = document.createElement("h2");
    const carouselDescription = document.createElement("p");
    const anchor = document.createElement("a");
    const carouselButton = document.createElement("button");
    const carouselImgContainer = document.createElement("div");
    const carouselImg = document.createElement("img");

    carouselSlide.className = "carousel-slide";
    carouselSlide.id = "indexEvent-" + number++;
    carouselText.className = "carousel-text";
    carouselImgContainer.className = "carousel-image-container";

    carouselHeader.innerText = product.title;
    carouselDescription.innerText = product.description;
    anchor.href = `/product/index.html?id=${product.id}`;
    carouselButton.innerText = "See more";
    carouselImg.setAttribute("src", product.image.url);

    document.querySelector("#carousel").appendChild(carouselSlide);
    carouselSlide.appendChild(carouselText);
    carouselText.appendChild(carouselHeader);
    carouselText.appendChild(carouselDescription);
    carouselText.appendChild(anchor);
    anchor.appendChild(carouselButton);
    carouselSlide.appendChild(carouselImgContainer);
    carouselImgContainer.appendChild(carouselImg);
  });
}
