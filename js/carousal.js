function makePreviousBtn(carousalId) {
  // PREVIOUS BUTTON
  const previousBtn = document.createElement("button");
  previousBtn.classList.add("control-btn");
  previousBtn.id = `previous-btn-${carousalId}`;
  previousBtn.innerHTML = "&#10094;";

  return previousBtn;
}

function makeNextBtn(carousalId) {
  // NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("control-btn");
  nextBtn.id = `next-btn-${carousalId}`;
  nextBtn.innerHTML = "&#10095;";

  return nextBtn;
}

function makeProgressBar() {
  // PROGRESS BAR FOR EACH IMAGE
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");

  // PROGRESS VALUE FOR EACH PROGRESS BAR
  const progressValue = document.createElement("div");
  progressValue.classList.add("progress-value");

  // ADDING PROGRESS VALUE TO PROGRESS BAR
  progressBar.appendChild(progressValue);

  return progressBar;
}

// GET ALL THE CAROUSALS IN THE DOCUMENT
let carousals = document.querySelectorAll(".carousal");

carousals.forEach((carousal, carousalNumber) => {
  // SETTING THE CAROUSAL ID FOR USE LATER
  carousal.id = `c-${carousalNumber}`;

  // GETTING ALL IMAGES INSIDE THE CAROUSAL
  const carousalImages = carousal.querySelectorAll(".image");

  carousalImages[0].classList.add("active");

  // CREATING CAROUSAL CONTROLS CONTAINER
  const carousalControls = document.createElement("div");
  carousalControls.classList.add("carousal-controls");

  // CREATING THE CONTAINER THAT WILL HOLD ALL PROGRESS BARS
  const progressContainer = document.createElement("div");
  progressContainer.classList.add("progress-container");

  // APPENDING A PROGRESS ITEM FOR EACH IMAGE IN THE CAROUSAL
  carousalImages.forEach((image, imageNumber) => {
    // PROGRESSES THAT WILL BE ADDED TO EACH CAROUSAL
    const progressItem = document.createElement("div");
    progressItem.classList.add("progress-item");
    progressItem.id = `c-${carousalNumber}-image-${imageNumber}`;

    // ADDING PROGRESS BAR TO PROGRESS ITEM WHICH WILL BE ADDED DEPENDING ON THE IMAGES COUNT IN THE CAROUSAL
    progressItem.appendChild(makeProgressBar());
    progressContainer.appendChild(progressItem);
  });

  // APPENDING PREVIOUS BUTTON TO CAROUSAL CONTROLS
  carousalControls.appendChild(makePreviousBtn(carousalNumber));

  // APPENDING THE WHOLE PROGRESS CONTAINER TO THE CAROUSAL CONTROLS DIV
  carousalControls.appendChild(progressContainer);

  // APPENDING THE NEXT BUTTON AT LAST
  carousalControls.appendChild(makeNextBtn(carousalNumber));

  // APPENDING EVERYTHING TO THE CAROUSAL ITSELF
  carousal.appendChild(carousalControls);

  // SET THE CAROUSAL IMAGE TO THE FIRST IMAGE
  carousalControls.dataset.currentImage = 0;
  carousalControls
    .querySelector(`#c-${carousalNumber}-image-0`)
    .classList.add("active");
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("control-btn")) {
    const carousal = e.target.closest(".carousal");
    let carousalId = parseInt(carousal.id.split("-")[1]);
    let carousalImages = carousal.querySelectorAll(".image");
    let carousalControls = carousal.querySelector(".carousal-controls");
    let progressItems = carousal.querySelectorAll(".progress-item");
    let currentImage = carousalControls.dataset.currentImage;

    // REMOVE ACTIVE CLASS FROM THE IMAGE
    carousalImages[currentImage].classList.remove("active");
    // REMOVE ACTIVE CLASS FROM THE PROGRESS ITEM OF THE IMAGE
    progressItems[currentImage].classList.remove("active");

    if (e.target.id.includes("next")) {
      currentImage = nextCarousalSlide(currentImage, carousalImages.length);
    } else if (e.target.id.includes("previous")) {
      currentImage = previousCarousalSlide(currentImage, carousalImages.length);
    }
    carousalImages[currentImage].classList.add("active");
    progressItems[currentImage].classList.add("active");
    carousalControls.dataset.currentImage = currentImage;
  }
});

function nextCarousalSlide(currentImageIndex, imagesNumber) {
  if (currentImageIndex == imagesNumber - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }

  return currentImageIndex;
}

function previousCarousalSlide(currentImageIndex, imagesNumber) {
  if (currentImageIndex == 0) {
    currentImageIndex = imagesNumber - 1;
  } else {
    currentImageIndex--;
  }

  return currentImageIndex;
}

// GET ALL CAROUSALS THAT HAS A DATA-AUTO = TRUE
// This selector finds all elements with the class 'carousal'
// AND the attribute data-auto exactly equal to "true"
const autoCarousals = document.querySelectorAll('.carousal[data-auto="true"]');

autoCarousals.forEach((carousal, index) => {});

let carousalInterval = setInterval();
