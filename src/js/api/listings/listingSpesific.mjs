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
  const { media, title, description, seller, endsAt, bids } =
    await fetchListingInfo();
  const { avatar, name } = seller;

  getLastItem(bids, 0);

  const imageCarousel = document.querySelector(".image-container");
  const listingInfo = document.querySelector(".listing-info");
  const sellerInfo = document.querySelector(".seller-info");
  const countdown = document.querySelector(".countdown");

  imageCarousel.innerHTML = `
    <img src="${media}" alt="listing image for ${title}" class="h-full"/>
  `;

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
