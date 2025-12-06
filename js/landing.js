window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.opacity = 0;
  loader.style.display = "none";
  const videos = document.querySelectorAll(".video-container");
  const logo = document.querySelector(".logo");

  videos.forEach((video) => {
    video.addEventListener("mouseenter", (e) => {
      video.querySelector("video").play();

      if (video.classList.contains("v1")) {
        logo.classList.add("golden-shadow");
      } else if (video.classList.contains("v2")) {
        logo.classList.add("blue-shadow");
      } else if (video.classList.contains("v3")) {
        logo.classList.add("gray-shadow");
      } else if (video.classList.contains("v4")) {
        logo.classList.add("brown-shadow");
      }
    });

    video.addEventListener("mouseleave", (e) => {
      video.querySelector("video").pause();

      if (video.classList.contains("v1")) {
        logo.classList.remove("golden-shadow");
      } else if (video.classList.contains("v2")) {
        logo.classList.remove("blue-shadow");
      } else if (video.classList.contains("v3")) {
        logo.classList.remove("gray-shadow");
      } else if (video.classList.contains("v4")) {
        logo.classList.remove("brown-shadow");
      }
    });
  });
});
