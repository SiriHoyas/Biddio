import { getListings } from "./components/getlistings.mjs";

const searchInput = document.querySelector("#search-bar");

async function searchListings() {
  const listings = await getListings();
  const searchInputValue = searchInput.value.toLowerCase().trim();

  listings
    .filter((listing) => {
      return listing.title.includes(searchInputValue);
    })
    .forEach((listing) => {
      document.querySelector(
        ".search-results"
      ).innerHTML += `<div>${listing.title}<div>`;
    });
}

searchInput.addEventListener("keyup", searchListings);
