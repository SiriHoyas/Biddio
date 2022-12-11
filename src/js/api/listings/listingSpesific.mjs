import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { placeBid, watchBidInput } from "../../components/placeBid.mjs";
import { displayCountdown } from "../../time/displayCountdown.mjs";

const { accessToken, userName } = getLocalStorage();
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

async function populateListing() {
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
  setupBids();
}

populateListing();

async function populateBiddingHistory(bid) {
  document.querySelector(".bidding-history").innerHTML += `
  <div class="bid flex justify-between p-1 rounded-sm odd:bg-inactiveTextDark even:bg-inactiveTextLight ">
  <p>${bid.bidderName}<p>
  <p class="text-xs">${bid.created}</p>
  <p>${bid.amount}<p>`;
}

function setupBids() {
  if (seller.name === userName) {
    document.querySelector(".bid-form-container").classList.add("hidden");
  }

  const bidInput = document.querySelector("#bid-input");
  let lastBidAmount;

  if (bids.length === 0) {
    document
      .querySelector(".bidding-history-container")
      .classList.add("hidden");
    bidInput.setAttribute("value", 1);
  } else {
    const currentBidContainer = document.querySelector(
      ".current-bid-container"
    );
    const lastBid = bids.slice(-1);
    lastBidAmount = lastBid[0].amount;
    if (lastBidAmount === 1) {
      currentBidContainer.innerHTML = `${lastBidAmount} Credit`;
    } else {
      currentBidContainer.innerHTML = `${lastBidAmount} Credits`;
    }
    bidInput.setAttribute("value", lastBidAmount + 1);
  }

  // POST BID
  watchBidInput(lastBidAmount);
  const bidForm = document.querySelector("#place-bid-form");
  bidForm.addEventListener("submit", (e) => placeBid(e, listingID));
}

// IMG CAROUSEL

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
