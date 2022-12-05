import { getListings } from "../fetch/fetchListings.mjs";

const searchInput = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");

async function searchListings(e) {
  e.preventDefault();
  searchResults.classList.remove("hidden");

  const listings = await getListings();

  const searchInputValue = searchInput.value.toLowerCase().trim();

  searchResults.innerHTML = "";
  listings
    .filter((listing) => {
      return listing.title.includes(searchInputValue);
    })
    .forEach((listing) => {
      searchResults.innerHTML += `<a href="./../single-listing.html?id=${listing.id}"">${listing.title}</a>`;
    });
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchListings(e);
  }
});

window.addEventListener("click", () => {
  if (searchInput !== document.activeElement) {
    searchResults.classList.add("hidden");
  }
});
