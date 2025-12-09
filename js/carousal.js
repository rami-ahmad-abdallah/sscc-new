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

carousals.forEach((carousal, index) => {

    carousal.id = `carousal-${index}`;
    carousal.dataset.currentImage = 0;

    // GETTING ALL IMAGES INSIDE THE CAROUSAL
    const carousalImages = carousal.querySelectorAll(".image");

    // START THE FIRST IMAGE AS ACTIVE
    carousalImages[0].classList.add("active");

    // CREATING CAROUSAL CONTROLS CONTAINER
    const carousalControls = document.createElement("div");
    carousalControls.classList.add("carousal-controls");

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

    // APPENDING PREVIOUS BUTTON TO CAROUSAL CONTROLS
    carousalControls.appendChild(makePreviousBtn(index));

    // APPENDING THE WHOLE PROGRESS CONTAINER TO THE CAROUSAL CONTROLS DIV
    carousalControls.appendChild(progressContainer);

    // APPENDING THE NEXT BUTTON AT LAST
    carousalControls.appendChild(makeNextBtn(index));

    // APPENDING EVERYTHING TO THE CAROUSAL ITSELF
    carousal.appendChild(carousalControls);
});

// CAROUSAL CONTROL EVENT LISTENERS
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("control-btn")) {
        const carousal = e.target.closest(".carousal");
        const carousalId = carousal.id.split("-")[1];
        const carousalImagesContainer = carousal.querySelector(".carousal-images");
        const carousalImages = carousal.querySelectorAll(".image");
        const totalImages = carousalImages.length;
        let currentImageIndex = parseInt(carousal.dataset.currentImage);
        if (e.target.id === `previous-btn-${carousalId}`) {
            // PREVIOUS BUTTON CLICKED
            if (currentImageIndex > 0) {
                carousalImages[currentImageIndex].classList.remove("active");
                currentImageIndex -= 1;
                carousalImages[currentImageIndex].classList.add("active");
                carousal.dataset.currentImage = currentImageIndex;
                carousalImagesContainer.scrollBy(-100, 0);
            }

        } else if (e.target.id === `next-btn-${carousalId}`) {
            // NEXT BUTTON CLICKED
            if (currentImageIndex < totalImages - 1) {
                carousalImages[currentImageIndex].classList.remove("active");
                currentImageIndex += 1;
                carousalImages[currentImageIndex].classList.add("active");
                carousal.dataset.currentImage = currentImageIndex;
                carousalImagesContainer.scrollBy(100, 0);
            }


        }
    }
});

function nextSlide(carousal) {

}