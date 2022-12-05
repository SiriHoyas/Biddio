const bid = document.querySelector("#bid");

const currentBid = 300;
const userCredits = 307;

bid.setAttribute("value", currentBid);

let bidValue = currentBid;

const plusBtn = document.querySelector(".increase");
const minusBtn = document.querySelector(".decrease");

function increaseBid() {
  if (bidValue < userCredits) {
    bidValue++;
    bid.setAttribute("value", bidValue);
    showBtn();
  }
}

function decreaseBid() {
  if (bidValue > currentBid) {
    bidValue--;
    bid.setAttribute("value", bidValue);
    showBtn();
  }
}

plusBtn.addEventListener("click", increaseBid);
minusBtn.addEventListener("click", decreaseBid);

// Show or hide buttons if user does not have enough credit, or is bidding below current bid
function showBtn() {
  if (bid.value > currentBid) {
    minusBtn.classList.remove("hidden");
  } else {
    minusBtn.classList.add("hidden");
  }

  if (bid.value >= userCredits) {
    plusBtn.classList.add("hidden");
  } else {
    plusBtn.classList.remove("hidden");
  }
}
