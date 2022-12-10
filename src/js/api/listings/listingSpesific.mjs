import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { displayCountdown } from "../../time/displayCountdown.mjs";

const { accessToken, userName, userCredits } = getLocalStorage();
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("id");

async function fetchListingInfo() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(
    `/listings/${listingID}?_seller=true&_bids=true`,
    options
  );

  return await response.json();
}

const { media, title, description, seller, endsAt, bids } =
  await fetchListingInfo();
console.log(endsAt);

async function populateListing() {
  if (accessToken) {
    const { avatar, name } = seller;

    if (name === userName) {
      const editBtnContainer = document.querySelector(".edit-btn-container");
      editBtnContainer.classList.remove("hidden");
      editBtnContainer.classList.add("flex");
    }

    getLastItem(bids, 0);
    bids.map((bid) => {
      console.log(bid);
      return populateBiddingHistory(bid);
    });

    const listingInfo = document.querySelector(".listing-info");
    const sellerInfo = document.querySelector(".seller-info");

    listingInfo.innerHTML = `
    <h1 class="text-2xl font-mainFont dark:text-offWhite">${title}</h1>
    <p class="text-sm font-bodyFont dark:text-offWhite">${description}</p>
  `;
    sellerInfo.innerHTML = `
    <img src="${avatar}" alt="${name} user avatar image" class="w-8 h-8 rounded-full mr-4" />
    <p class="text-lg font-mainFont dark:text-offWhite">${name}</p>
  `;
  } else {
    document.querySelector(".single-listing-container").classList.add("hidden");
    const backBtn = document.querySelector(".back");
    backBtn.classList.remove("hidden");
    backBtn.addEventListener("click", () => {
      history.back();
    });
    const notLoggedIn = document.querySelector(".not-logged-in");
    notLoggedIn.classList.add("flex");
    notLoggedIn.classList.remove("hidden");
  }
}

populateListing();

async function populateBiddingHistory(bid) {
  document.querySelector(".bidding-history").innerHTML += `
  <div class="bid flex justify-between p-1 rounded-sm odd:bg-inactiveTextDark even:bg-inactiveTextLight ">
  <p>${bid.bidderName}<p>
  <p class="text-xs">${bid.created}</p>
  <p>${bid.amount}<p>`;
}

// Image carousel

let counter = 0;

const nextBtn = document.querySelector(".next-img");
const prevBtn = document.querySelector(".prev-img");

if (media.length <= 1) {
  nextBtn.classList.add("hidden");
  prevBtn.classList.add("hidden");
}

async function placeImage(media, title) {
  const imageCarousel = document.querySelector(".image-container");

  imageCarousel.innerHTML = "";
  for (let i = 0; i < media.length; i++) {
    if (i === counter) {
      console.log(i);
      imageCarousel.innerHTML += `
      <img src="${media[i]}" alt="listing image for ${title[i]}" onerror="this.src = './src/img/listings-placeholder.png';" class="h-full listing-img"/>`;
    }
  }
}

placeImage(media, title);

nextBtn.addEventListener("click", () => {
  counter++;

  if (counter > media.length) {
    nextBtn.classList.add("hidden");
  }
  console.log(counter);
  placeImage(media, title);
});

prevBtn.addEventListener("click", () => {
  counter--;
  console.log(counter);
  placeImage(media, title);
});

// Countdown

setInterval(() => {
  displayCountdown(endsAt);
}, 1000);

// Place bid function

if (seller.name === userName) {
  document.querySelector(".bid-form-container").classList.add("hidden");
  document.querySelector(".submit-bid-btn").classList.add("hidden");
}

const lastBid = bids.slice(-1);

const currentBidContainer = document.querySelector(".current-bid-container");

if (bids.length > 0) {
  const lastBidAmount = lastBid[0].amount;
  if (lastBidAmount > 1) {
    currentBidContainer.innerHTML = `${lastBidAmount} Credits`;
  } else if (lastBidAmount <= 1) {
    currentBidContainer.innerHTML = `${lastBidAmount} Credit`;
  }
}

const bidInput = document.querySelector("#bid");

// Set value of bid input so user can quickly bid one over current bid

if (bids.length === 0) {
  bidInput.setAttribute("value", 1);
} else bidInput.setAttribute("value", lastBid[0].amount + 1);

// Increase or decrease amount
let bidValue = bidInput.getAttribute("value");
bidValue = parseInt(bidValue);
console.log(typeof bidValue);

const plusBtn = document.querySelector(".increase");
const minusBtn = document.querySelector(".decrease");

plusBtn.addEventListener("click", () => {
  if (bidValue < userCredits) {
    bidValue++;
    bidInput.setAttribute("value", bidValue);
  } else {
    console.log("du har ikke nok");
  }
});

minusBtn.addEventListener("click", () => {
  bidValue--;
  bidInput.setAttribute("value", bidValue);
});

// POST BID
const bidForm = document.querySelector(".bid-form");

bidForm.addEventListener("submit", (e) => {
  placeBid(e, bidValue, listingID);
});

async function placeBid(e, bidValue, listingID) {
  e.preventDefault();

  const options = {
    method: "POST",
    body: JSON.stringify({ amount: bidValue }),
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
  }
}

console.log(endsAt);
