import { getListings } from "../fetch/fetchListings.mjs";

const searchInput = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");

async function searchListings(e) {
  e.preventDefault();
  const searchInputValue = searchInput.value.toLowerCase().trim();
  if (!searchInputValue) {
    return;
  }

  searchResults.classList.remove("hidden");

  const listings = await getListings();

  searchResults.innerHTML = "";
  const filteredListings = listings.filter((listing) => {
    return listing.title.toLowerCase().includes(searchInputValue);
  });

  if (filteredListings.length > 0) {
    filteredListings.forEach((listing) => {
      searchResults.innerHTML += `<a href="./../single-listing.html?id=${listing.id}"">${listing.title}</a>`;
    });
  } else {
    searchResults.innerHTML = `<p>No results</p>`;
  }
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
