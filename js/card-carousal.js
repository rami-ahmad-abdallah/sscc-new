function makePreviousBtn(carousalId) {
  // PREVIOUS BUTTON
  const previousBtn = document.createElement("button");
  previousBtn.classList.add("card-carousal-control", 'previous-btn');
  previousBtn.id = `previous-btn-${carousalId}`;
  previousBtn.innerHTML = "&#10094;";

  return previousBtn;
}

function makeNextBtn(carousalId) {
  // NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("card-carousal-control", 'next-btn');
  nextBtn.id = `next-btn-${carousalId}`;
  nextBtn.innerHTML = "&#10095;";

  return nextBtn;
}

// GET ALL THE cardCarousals IN THE DOCUMENT
let cardCarousals = document.querySelectorAll(".card-carousal");

// PREPARING EACH CAROUSAL USING JS
cardCarousals.forEach((carousal, carousalNumber) => {
  // SETTING THE CAROUSAL ID FOR USE LATER
  carousal.id = `card-carousal-${carousalNumber}`;

  // GETTING ALL cardS INSIDE THE CAROUSAL
  const carousalCards = carousal.querySelectorAll(".carousal-card");

  // CREATING CAROUSAL CONTROLS CONTAINER
  const carousalControls = document.createElement("div");
  carousalControls.classList.add("card-carousal-controls");


  // APPENDING PREVIOUS BUTTON TO CONTROLS WRAPPER
  carousalControls.appendChild(makePreviousBtn(carousalNumber));
  // APPENDING THE NEXT BUTTON AT LAST
  carousalControls.appendChild(makeNextBtn(carousalNumber));

  carousalCards.forEach((card, cardNumber) => {
    card.id = `c-${carousalNumber}-card-${cardNumber}`;
  });

  // APPENDING EVERYTHING TO THE CAROUSAL
  carousal.appendChild(carousalControls);

  carousalCards[0].classList.add("active");
  // SET THE CAROUSAL card TO THE FIRST card
  carousalControls.dataset.currentCard = 0;
});

// IF A NEXT OR PREVIOUS BUTTON CLICKED ON A CAROUSAL
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("card-carousal-control")) {
    const carousal = e.target.closest(".card-carousal");

    if (e.target.id.includes("next")) {
      nextCard(carousal);
    } else if (e.target.id.includes("previous")) {
      previousCard(carousal);
    }
  }
});

// GO TO NEXT Card ON A CAROUSAL
function nextCard(carousal) {
  let carousalCards = carousal.querySelectorAll(".carousal-card");
  let carousalControls = carousal.querySelector(".card-carousal-controls");
  let currentCard = carousalControls.dataset.currentCard;

  // REMOVE ACTIVE CLASS FROM THE card
  carousalCards[currentCard].classList.remove("active");

  if (currentCard == carousalCards.length - 1) {
    carousal.querySelector('.next-btn').classList.add('hide-control');
    currentCard = 0;
  } else {
    currentCard++;
  }

  carousalCards[currentCard].scrollIntoView({
    behavior: 'smooth', // Optional: adds a smooth animation
    block: 'nearest',   // Prevents forced vertical scrolling if already visible vertically
    inline: 'center'    // Aligns the target to the center of the horizontal container
  });

  carousalCards[currentCard].classList.add("active");
  carousalControls.dataset.currentCard = currentCard;


}

// GO TO PREVIOUS Card ON A CAROUSAL
function previousCard(carousal) {
  let carousalId = parseInt(carousal.id.split("-")[1]);
  let carousalCards = carousal.querySelectorAll(".carousal-card");
  let carousalControls = carousal.querySelector(".card-carousal-controls");
  let progressItems = carousal.querySelectorAll(".progress-item");
  let currentCard = carousalControls.dataset.currentCard;

  // REMOVE ACTIVE CLASS FROM THE card
  carousalCards[currentCard].classList.remove("active");

  if (currentCard == 0) {
    currentCard = carousalCards.length - 1;
  } else {
    currentCard--;
  }
  carousalCards[currentCard].scrollIntoView({
    behavior: 'smooth', // Optional: adds a smooth animation
    block: 'nearest',   // Prevents forced vertical scrolling if already visible vertically
    inline: 'center'    // Aligns the target to the center of the horizontal container
  });
  carousalCards[currentCard].classList.add("active");

  carousalControls.dataset.currentCard = currentCard;

}


