const loader = document.getElementById("loader");
setTimeout(loaderOpacity, 6000);
setTimeout(loaderRemove, 6500);

function loaderOpacity() {
  loader.style.opacity = 0;
}

function loaderRemove() {
  loader.style.display = "none";
  document.body.style.overflow = "auto";
}
window.addEventListener("load", function () {
  const menuToggler = this.document.querySelector(".menu-toggle");
  const menu = this.document.querySelector(".menu");
  const goToTopBtn = this.document.querySelector(".gototop");
  const whatsAppBtn = this.document.querySelector(".whats");

  menuToggler.addEventListener("click", () => {
    menu.classList.toggle("on");
    menuToggler.classList.toggle("on");
  });

  let pageLinks = this.document.querySelectorAll("a");
  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.href.includes("#")) {
        e.preventDefault();
        this.document.getElementById(link.hash.substring(1)).scrollIntoView();
        menu.classList.remove("on");
        menuToggler.classList.remove("on");
      }
    });
  });

  if (this.window.scrollY > 420) {
    goToTopBtn.classList.add("show");
    whatsAppBtn.classList.add("show");
    menuToggler.classList.add("show");
  }

  this.document.addEventListener("scroll", (e) => {
    if (this.scrollY > 420) {
      goToTopBtn.classList.add("show");
      whatsAppBtn.classList.add("show");
      menuToggler.classList.add("show");
    } else {
      goToTopBtn.classList.remove("show");
      whatsAppBtn.classList.remove("show");
      menuToggler.classList.remove("show");
    }
  });
});
