import { fetchContent } from "./components/fetchContent.mjs";
import { getLocalStorage } from "./components/getLocalstorage.mjs";
import { listingsHTML } from "./components/templates/listingsTemplate.mjs";

async function populateListings() {
  const { accessToken } = getLocalStorage();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(
    "/listings?_seller=true&_bids=true",
    options
  );
  const json = await response.json();
  console.log(json);

  document.querySelector(".listings-container").innerHTML = json
    .map((listing) => {
      return listingsHTML(
        listing.media,
        listing.title,
        listing.seller.name,
        listing.endsAt,
        listing.bids,
        listing.id
      );
    })
    .join("");
}

populateListings();
