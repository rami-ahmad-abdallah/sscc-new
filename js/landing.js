window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(loaderOpacity, 1000);
  setTimeout(loaderRemove, 1350);

  function loaderOpacity() {
    loader.style.opacity = 0;
  }

  function loaderRemove() {
    loader.style.display = "none";
  }

  const allImages = this.document.querySelectorAll("img");

  allImages.forEach((image) => {
    image.setAttribute("loading", "lazy");
  });
});
