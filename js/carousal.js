function makePreviousBtn() {
  // PREVIOUS BUTTON
  const previousBtn = document.createElement("button");
  previousBtn.classList.add("control-btn");
  previousBtn.id = "prev-btn";
  previousBtn.innerHTML = "&#10094;";

  return previousBtn;
}

function makeNextBtn() {
  // NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("control-btn");
  nextBtn.id = "next-btn";
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

carousals.forEach((carousal) => {
  // GETTING ALL IMAGES INSIDE THE CAROUSAL
  const carousalImages = carousal.querySelectorAll(".image");

  // CREATING CAROUSAL CONTROLS CONTAINER
  const carousalControls = document.createElement("div");
  carousalControls.classList.add("carousal-controls");

  // APPENDING PREVIOUS BUTTON TO CAROUSAL CONTROLS
  carousalControls.appendChild(makePreviousBtn());

  // CREATING THE CONTAINER THAT WILL HOLD ALL PROGRESS BARS
  const progressContainer = document.createElement("div");
  progressContainer.classList.add("progress-container");

  // APPENDING A PROGRESS ITEM FOR EACH IMAGE IN THE CAROUSAL
  carousalImages.forEach((image, index) => {
    // PROGRESSES THAT WILL BE ADDED TO EACH CAROUSAL
    const progressItem = document.createElement("div");
    progressItem.classList.add("progress-item");
    progressItem.id = `image-${index}`;

    // ADDING PROGRESS BAR TO PROGRESS ITEM WHICH WILL BE ADDED DEPENDING ON THE IMAGES COUNT IN THE CAROUSAL
    progressItem.appendChild(makeProgressBar());
    progressContainer.appendChild(progressItem);
  });

  // APPENDING THE WHOLE PROGRESS CONTAINER TO THE CAROUSAL CONTROLS DIV
  carousalControls.appendChild(progressContainer);

  // APPENDING THE NEXT BUTTON AT LAST
  carousalControls.appendChild(makeNextBtn());

  // APPENDING EVERYTHING TO THE CAROUSAL ITSELF
  carousal.appendChild(carousalControls);
});
