import { fetchContent } from "../../components/fetchContent.mjs";
import { getLastItem } from "../../components/getLastItem.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";

const { accessToken } = getLocalStorage;

async function fetchListingInfo() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const listingID = params.get("id");

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

async function populateListing() {
  const { title, description, seller, endsAt, bids } = await fetchListingInfo();
  const { avatar, name } = seller;

  getLastItem(bids, 0);

  const listingInfo = document.querySelector(".listing-info");
  const sellerInfo = document.querySelector(".seller-info");
  const countdown = document.querySelector(".countdown");

  listingInfo.innerHTML = `
    <h1 class="text-2xl font-mainFont dark:text-offWhite">${title}</h1>
    <p class="text-sm font-bodyFont dark:text-offWhite">${description}</p>
  `;
  sellerInfo.innerHTML = `
    <img src="${avatar}" alt="${name} user avatar image" class="w-8 h-8 rounded-full mr-4" />
    <p class="text-lg font-mainFont dark:text-offWhite">${name}</p>
  `;

  countdown.innerHTML = `
  <div>${endsAt}</div>
  `;
}

populateListing();

let counter = 0;

async function placeImage(media, title) {
  const imageCarousel = document.querySelector(".image-container");
  imageCarousel.innerHTML = "";
  for (let i = 0; i < media.length; i++) {
    if (i === counter)
      imageCarousel.innerHTML += `
  <img src="${media[i]}" alt="listing image for ${title[i]}" class="h-full listing-img"/>`;
  }
}

const { media, title } = await fetchListingInfo();
placeImage(media, title);

// Image carousel

const nextBtn = document.querySelector(".next-img");
const prevBtn = document.querySelector(".prev-img");

nextBtn.addEventListener("click", () => {
  counter++;

  console.log(counter);
  placeImage(media, title);
});

prevBtn.addEventListener("click", () => {
  counter--;
  console.log(counter);
  placeImage(media, title);
});
