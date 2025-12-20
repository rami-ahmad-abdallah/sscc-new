let CAROUSAL_TIME = 5000;
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
  progressValue.style.animationDuration = `${CAROUSAL_TIME}ms`;

  // ADDING PROGRESS VALUE TO PROGRESS BAR
  progressBar.appendChild(progressValue);

  return progressBar;
}

// GET ALL THE CAROUSALS IN THE DOCUMENT
let carousals = document.querySelectorAll(".carousal");

// PREPARING EACH CAROUSAL USING JS
carousals.forEach((carousal, carousalNumber) => {
  // SETTING THE CAROUSAL ID FOR USE LATER
  carousal.id = `c-${carousalNumber}`;

  // GETTING ALL ITEMS INSIDE THE CAROUSAL
  const carousalItems = carousal.querySelectorAll(".item");

  // ADDING ACTIVE CLASS TO THE FIRST ITEM OF EACH CAROUSAL
  carousalItems[0].classList.add("active");

  // CREATING CAROUSAL CONTROLS CONTAINER
  const carousalControls = document.createElement("div");
  carousalControls.classList.add("carousal-controls");

  // CREATING A WRAPPER FOR THE CONTROLS
  let controlsWrapper = document.createElement("div");
  controlsWrapper.classList.add("controls-wrapper");

  // APPENDING PREVIOUS BUTTON TO CONTROLS WRAPPER
  controlsWrapper.appendChild(makePreviousBtn(carousalNumber));

  // CREATING THE CONTAINER THAT WILL HOLD ALL PROGRESS BARS
  const progressContainer = document.createElement("div");
  progressContainer.classList.add("progress-container");

  // APPENDING A PROGRESS ITEM FOR EACH ITEM IN THE CAROUSAL
  carousalItems.forEach((item, itemNumber) => {
    // PROGRESSES THAT WILL BE ADDED TO EACH CAROUSAL
    const progressItem = document.createElement("div");
    progressItem.classList.add("progress-item");
    progressItem.id = `c-${carousalNumber}-item-${itemNumber}`;

    if (carousal.dataset.auto == "true") {
      // GET THE CAROUSAL ANIMATION DURATION FROM THE AUTO CAROUSAL DATA_DURATION
      CAROUSAL_TIME = carousal.dataset.duration;
      if (CAROUSAL_TIME) {
        CAROUSAL_TIME = parseInt(carousal.dataset.duration);
      } else {
        CAROUSAL_TIME = 5000;
      }

      item.style.animationDuration = `${CAROUSAL_TIME}ms`;
    }

    // ADDING PROGRESS BAR TO PROGRESS ITEM WHICH WILL BE ADDED DEPENDING ON THE IMAGES COUNT IN THE CAROUSAL
    progressItem.appendChild(makeProgressBar());
    progressContainer.appendChild(progressItem);
  });

  // APPENDING THE WHOLE PROGRESS CONTAINER TO THE CAROUSAL CONTROLS WRAPPER
  controlsWrapper.appendChild(progressContainer);

  // APPENDING THE NEXT BUTTON AT LAST
  controlsWrapper.appendChild(makeNextBtn(carousalNumber));

  // APPENDING THE WRAPPER TO THE CAROUSAL CONTROLS
  carousalControls.appendChild(controlsWrapper);

  // APPENDING EVERYTHING TO THE CAROUSAL
  carousal.appendChild(carousalControls);

  // SET THE CAROUSAL IMAGE TO THE FIRST IMAGE
  carousalControls.dataset.currentItem = 0;

  progressContainer
    .querySelector(`#c-${carousalNumber}-item-0`)
    .classList.add("active");
});

// IF A NEXT OR PREVIOUS BUTTON CLICKED ON A CAROUSAL
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("control-btn")) {
    const carousal = e.target.closest(".carousal");

    if (e.target.id.includes("next")) {
      nextSlide(carousal);
    } else if (e.target.id.includes("previous")) {
      previousSlide(carousal);
    }
  }
});

// GO TO NEXT SLIDE ON A CAROUSAL
function nextSlide(carousal) {
  let carousalId = parseInt(carousal.id.split("-")[1]);
  let carousalItems = carousal.querySelectorAll(".item");
  let carousalControls = carousal.querySelector(".carousal-controls");
  let progressItems = carousal.querySelectorAll(".progress-item");
  let currentItem = carousalControls.dataset.currentItem;

  // REMOVE ACTIVE CLASS FROM THE IMAGE
  carousalItems[currentItem].classList.remove("active");

  // REMOVE ACTIVE CLASS FROM THE PROGRESS ITEM OF THE IMAGE
  progressItems[currentItem].classList.remove("active");

  if (currentItem == carousalItems.length - 1) {
    currentItem = 0;
  } else {
    currentItem++;
  }

  carousalItems[currentItem].classList.add("active");
  carousalControls.dataset.currentItem = currentItem;
  progressItems[currentItem].classList.add("active");
  if (carousal.dataset.auto == "true") {
    // Reset the timeout specific to this carousel instance
    resetCarousalTimeout(carousal);
  }
}

// GO TO PREVIOUS SLIDE ON A CAROUSAL
function previousSlide(carousal) {
  let carousalId = parseInt(carousal.id.split("-")[1]);
  let carousalItems = carousal.querySelectorAll(".item");
  let carousalControls = carousal.querySelector(".carousal-controls");
  let progressItems = carousal.querySelectorAll(".progress-item");
  let currentItem = carousalControls.dataset.currentItem;

  // REMOVE ACTIVE CLASS FROM THE IMAGE
  carousalItems[currentItem].classList.remove("active");
  // REMOVE ACTIVE CLASS FROM THE PROGRESS ITEM OF THE IMAGE
  progressItems[currentItem].classList.remove("active");

  if (currentItem == 0) {
    currentItem = carousalItems.length - 1;
  } else {
    currentItem--;
  }

  carousalItems[currentItem].classList.add("active");
  progressItems[currentItem].classList.add("active");
  carousalControls.dataset.currentItem = currentItem;

  if (carousal.dataset.auto == "true") {
    // Reset the timeout specific to this carousel instance
    resetCarousalTimeout(carousal);
  }
}

// Helper function to manage the timeout for a specific carousel element
function resetCarousalTimeout(carousal) {
  // 1. Clear any existing timeout stored in a data attribute
  const existingTimeoutId = carousal.dataset.timeoutId;
  if (existingTimeoutId) {
    clearTimeout(parseInt(existingTimeoutId));
  }

  // 2. Set a new timeout and store its ID in a data attribute
  const newTimeoutId = setTimeout(() => {
    nextSlide(carousal);
  }, CAROUSAL_TIME);

  carousal.dataset.timeoutId = newTimeoutId;
}

// GET ALL CAROUSALS THAT HAS A DATA-AUTO = TRUE
const autoCarousals = document.querySelectorAll('.carousal[data-auto="true"]');

autoCarousals.forEach((carousal, index) => {
  // Reset the timeout specific to this carousel instance
  resetCarousalTimeout(carousal);
});

// EVENT LISTENER TO PAUSE THE CAROUSALS WHEN TAB IS NOT OPEN
document.addEventListener("visibilitychange", function () {
  let carousals = document.querySelectorAll('.carousal[data-auto="true"]');

  if (document.hidden) {
    carousals.forEach((carousal, index) => {
      const existingTimeoutId = carousal.dataset.timeoutId;
      if (existingTimeoutId) {
        clearTimeout(parseInt(existingTimeoutId));
      }
    });
  } else {
    carousals.forEach((carousal, index) => {
      nextSlide(carousal);
    });
  }
});
