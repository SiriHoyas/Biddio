import { fetchContent } from "../api/fetch/fetchContent.mjs";
import { fetchCredits } from "../api/profile/fetchCredits.mjs";
import { getLocalStorage } from "./getLocalstorage.mjs";

const { accessToken, userCredits, userName } = getLocalStorage();

const bidInput = document.querySelector("#bid-input");

export async function placeBid(e, listingID) {
  e.preventDefault();
  fetchCredits(accessToken, userName);
  const bid = parseInt(bidInput.value);

  const options = {
    method: "POST",
    body: JSON.stringify({ amount: bid }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const response = await fetchContent(`/listings/${listingID}/bids`, options);
    const json = await response.json();

    if (response.ok) {
      window.location.reload();
    } else {
      const errorMessage = json.errors[0].message;
      const bidErrorContainer = document.querySelector(".bid-error");

      bidErrorContainer.classList.remove("hidden");
      bidErrorContainer.innerHTML = errorMessage;
    }
  } catch (error) {
    console.log(error);
    // TODO: Show "Unexpected error"
  }
}

export function watchBidInput(currentHighestBid) {
  const placeBidBtn = document.querySelector("#place-bid");
  bidInput.addEventListener("input", (e) => {
    const value = e.target.value;
    const newBid = parseInt(value);
    const isHigherThanCurrentBid = !currentHighestBid || newBid > currentHighestBid;
    const isValidBid = newBid > 0 && isHigherThanCurrentBid;
    disableButton(placeBidBtn, !newBid || !isValidBid || newBid > userCredits);
  });
}

export function disableButton(btn, disable) {
  if (disable) {
    btn.setAttribute("disabled", "disabled");
  } else {
    btn.removeAttribute("disabled");
  }
}
