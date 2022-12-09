import { convertEndtime } from "../../time/convertEndtime.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getListings } from "../../api/fetch/fetchListings.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";

const listingsContainer = document.querySelector(".listings-container");

async function displayListings() {
  const listings = await getListings(`&offset=0&limit=27_active=true`);

  listings.forEach((listing) => {
    const bid = getLastItem(listing.bids, "No Bids");
    const { date, time } = convertEndtime(listing.endsAt);
    listingsContainer.innerHTML += listingsHTML(
      listing.media[0],
      listing.title,
      listing.seller.name,
      date,
      time,
      bid.amount ? bid.amount : bid,
      listing.id
    );
  });
}

displayListings();

let offset = 0;

async function showMore() {
  offset = offset + 27;

  const listings = await getListings(`&offset=${offset}&limit=27&_active=true`);
  console.log(listings);
  listings.forEach((listing) => {
    const bid = getLastItem(listing.bids, "No Bids");
    const { date, time } = convertEndtime(listing.endsAt);

    listingsContainer.innerHTML += listingsHTML(
      listing.media,
      listing.title,
      listing.seller.name,
      date,
      time,
      bid.amount ? bid.amount : bid,
      listing.id
    );
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    console.log("BUNN");
    showMore();
  }
});
