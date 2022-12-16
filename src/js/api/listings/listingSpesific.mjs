import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { placeBid, watchBidInput } from "../../components/placeBid.mjs";
import { sortBiddingHistory } from "../../components/sortBiddingHistroy.mjs";
import { displayCountdown } from "../../time/displayCountdown.mjs";

const nextBtn = document.querySelector(".next-img");
const prevBtn = document.querySelector(".prev-img");

const { accessToken, userName } = getLocalStorage();
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("id");
let displayedPhotoIndex = 0;

function errorMessage() {
  document.querySelector(".single-listing-error ").classList.remove("hidden");
  document.querySelector(".single-listing-container").classList.add("hidden");
}

async function fetchListingInfo() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetchContent(`/listings/${listingID}?_seller=true&_bids=true`, options);
    if (response.ok) {
      return await response.json();
    } else {
      errorMessage();
    }
  } catch (error) {
    errorMessage();
  }
}

const { media, title, description, seller, endsAt, bids } = await fetchListingInfo();
const biddingHistoryContainer = document.querySelector(".bidding-history-container");

async function populateListing() {
  const { avatar, name } = seller;
  const bidForm = document.querySelector(".bid-form-container");
  document.querySelector("title").innerHTML = title;

  if (name === userName) {
    const editBtnContainer = document.querySelector(".edit-btn");
    editBtnContainer.classList.remove("hidden");
    editBtnContainer.classList.add("flex");
    bidForm.classList.add("hidden");
  }

  const listingInfo = document.querySelector(".listing-info");
  const sellerInfo = document.querySelector(".seller-info");

  if (accessToken) {
    getLastItem(bids, 0);
    sellerInfo.innerHTML = `
    <img src="${avatar}" alt="${name} user avatar image" onerror="this.src = './src/img/profile-placeholder.png';" class="w-8 h-8 rounded-full mr-4 object-cover" />
    <p class="text-xl font-mainFont dark:text-offWhite">${name}</p>
  `;
    setupBids();
  } else {
    sellerInfo.innerHTML = `  <p class="italic font-mainFont dark:text-inactiveTextDark">You have to be logged in to view seller info</p>`;
    bidForm.innerHTML = `<p class="italic font-mainFont dark:text-inactiveTextDark">You have to be logged in to bid on this item</p>`;
    biddingHistoryContainer.classList.add("hidden");
  }

  listingInfo.innerHTML = `
    <h1 class="text-2xl font-mainFont dark:text-offWhite">${title}</h1>
    <p class="text-sm font-bodyFont dark:text-offWhite">${description}</p>
  `;

  placeImage(media, title);
}

populateListing();

const sortedBids = sortBiddingHistory(bids);

sortedBids.forEach((bid) => {
  populateBiddingHistory(bid);
});

async function populateBiddingHistory(bid) {
  const bidTimeFormatted = new Date(bid.created).toLocaleString();
  biddingHistoryContainer.innerHTML += `
  <div class="bid flex justify-between items-center px-3 py-1 border-b border-borderLight rounded-sm font-mainFont text-lg  dark:text-offWhite dark:border-borderDark odd:bg-tableOdd even:bg-tableEven ">
  <p data-cy="bidder-name" class="w-1/3 ">${bid.bidderName}<p>
  <p class="text-xs w-1/3 ">${bidTimeFormatted}</p>
  <p class="w-1/3 flex justify-end">${bid.amount}<p>`;
}

/**
 * The function checks if the current logged in user is the owner of the listing, and removes the
 * bidding feature.
 *
 * If the listing has no bids, the input field of bids is set to 1, so the user can quickly place bid of the lowest allowed amount
 *
 * If the listing already has bids, the current bid will show over the listing form,
 * and the input field will have one over the current bid to allow user to quickly bid on item.
 */

function setupBids() {
  if (seller.name === userName) {
    document.querySelector(".bid-form-container").classList.add("hidden");
  }

  const bidInput = document.querySelector("#bid-input");
  let lastBidAmount;

  if (bids.length === 0) {
    document.querySelector(".bidding-history-container").classList.add("hidden");
    bidInput.setAttribute("value", 1);
  } else {
    const currentBidContainer = document.querySelector(".current-bid-container");
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

async function placeImage(media, title) {
  if (media.length <= 1) {
    nextBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
  }
  const imageCarousel = document.querySelector(".image-container");

  imageCarousel.innerHTML = "";
  const image = media[displayedPhotoIndex];
  if (media.length > 0) {
    imageCarousel.innerHTML += `
    <img src="${image}" alt="listing image for ${title}" onerror="this.src = './src/img/listings-placeholder.png';" class="h-full object-contain listing-img"/>
    <p class="mt-4 font-mainFont dark:text-offWhite">${displayedPhotoIndex + 1} / ${media.length}</p>`;
  } else {
    imageCarousel.innerHTML = ` <p class="mt-4 font-mainFont text-inactiveTextLight dark:text-inactiveTextDark">No listing image</p>`;
  }
}

nextBtn.addEventListener("click", () => {
  displayedPhotoIndex++;

  if (displayedPhotoIndex >= media.length) {
    displayedPhotoIndex = 0;
  }
  placeImage(media, title);
});

prevBtn.addEventListener("click", () => {
  displayedPhotoIndex--;
  if (displayedPhotoIndex < 0) {
    displayedPhotoIndex = media.length - 1;
  }
  placeImage(media, title);
});

// Countdown

setInterval(() => {
  displayCountdown(endsAt);
}, 1000);
