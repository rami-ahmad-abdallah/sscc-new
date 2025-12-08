let carousals = document.querySelectorAll('.carousal');

carousals.forEach(carousal => {

    // GETTING ALL IMAGES INSIDE THE CAROUSAL
    const carousalImages = carousal.querySelectorAll('.image');

    // CREATING CAROUSAL CONTROLS
    const carousalControls = document.createElement('div');
    carousalControls.classList.add('carousal-controls');

    // PREVIOUS BUTTON
    const controlBtn = document.createElement('button');
    controlBtn.classList.add('control-btn');
    controlBtn.id = 'prev-btn';
    controlBtn.innerHTML = '&#10094;';

    // APPENDING PREVIOUS BUTTON TO CAROUSAL CONTROLS
    carousalControls.appendChild(controlBtn);

    const progressOfImages = document.createElement('div');
    progressOfImages.classList.add('progress-of-images');

    const progressElement = `<div class="progress-item">
                    <div class="progress-bar">
                        <div class="progress-value"></div>
                    </div>
                </div>`;

    carousalImages.forEach((image, index) => {
        progressOfImages.appendChild(progressElement);
    });



    console.log(carousalImages.length);

});