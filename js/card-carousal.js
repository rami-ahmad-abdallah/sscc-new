function makePreviousBtn(carousalId) {
  // PREVIOUS BUTTON
  const previousBtn = document.createElement("button");
  previousBtn.classList.add(
    "card-carousal-control",
    "previous-btn",
    "hide-control"
  );
  previousBtn.id = `previous-card-btn-${carousalId}`;
  previousBtn.innerHTML = "&#10094;";

  return previousBtn;
}

function makeNextBtn(carousalId) {
  // NEXT BUTTON
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("card-carousal-control", "next-btn");
  nextBtn.id = `next-card-btn-${carousalId}`;
  nextBtn.innerHTML = "&#10095;";

  return nextBtn;
}

// GET ALL THE cardCarousals IN THE DOCUMENT
let cardCarousals = document.querySelectorAll(".card-carousal");

// PREPARING EACH CAROUSAL USING JS
cardCarousals.forEach((carousal, carousalNumber) => {
  // SETTING THE CAROUSAL ID FOR USE LATER
  carousal.id = `card-carousal-${carousalNumber}`;

  const carousalCardsContainer = carousal.querySelector(".carousal-cards");

  // GETTING ALL cardS INSIDE THE CAROUSAL
  const carousalCards = carousal.querySelectorAll(".carousal-card");

  // ADDING A PREVIOUS BUTTON BEFORE THE CARDS CONTAINER
  carousalCardsContainer.insertAdjacentElement(
    "beforebegin",
    makePreviousBtn(carousalNumber)
  );

  // ADDING A NEXT BUTTON AFTER THE CARDS CONTAINER
  carousalCardsContainer.insertAdjacentElement(
    "afterend",
    makeNextBtn(carousalNumber)
  );

  carousalCards.forEach((card, cardNumber) => {
    card.id = `c-${carousalNumber}-card-${cardNumber}`;
  });

  carousalCards[0].classList.add("active");
  // SET THE CAROUSAL card TO THE FIRST card
  carousal.dataset.currentCard = 0;
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
  let currentCard = carousal.dataset.currentCard;

  // REMOVE ACTIVE CLASS FROM THE card
  carousalCards[currentCard].classList.remove("active");
  currentCard++;

  if (currentCard == carousalCards.length - 1) {
    carousal.querySelector(".next-btn").classList.add("hide-control");
  }

  if (currentCard > 0) {
    carousal.querySelector(".previous-btn").classList.remove("hide-control");
  }

  scrollCardToView(carousal, currentCard);
}

// GO TO PREVIOUS Card ON A CAROUSAL
function previousCard(carousal) {
  let carousalId = parseInt(carousal.id.split("-")[2]); // GET THE CAROUSAL ID IF NEEDED
  let carousalCards = carousal.querySelectorAll(".carousal-card");
  let currentCard = carousal.dataset.currentCard;

  // REMOVE ACTIVE CLASS FROM THE card
  carousalCards[currentCard].classList.remove("active");
  currentCard--;

  if (currentCard == 0) {
    carousal.querySelector(".previous-btn").classList.add("hide-control");
  }

  if (currentCard < carousalCards.length - 1) {
    carousal.querySelector(".next-btn").classList.remove("hide-control");
  }

  scrollCardToView(carousal, currentCard);
}

function scrollCardToView(carousal, cardNumber) {
  let carousalCards = carousal.querySelectorAll(".carousal-card");
  carousalCards[cardNumber].scrollIntoView({
    behavior: "smooth", // Optional: adds a smooth animation
    block: "nearest", // Prevents forced vertical scrolling if already visible vertically
    inline: "center", // Aligns the target to the center of the horizontal container
  });
  carousalCards[cardNumber].classList.add("active");
  carousal.dataset.currentCard = cardNumber;
}
