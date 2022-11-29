import { getLastItem } from "../../components/getLastItem.mjs";
import { getListings } from "../../components/getlistings.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";

async function displayListings() {
  const listings = await getListings();
  console.log(listings);

  listings.map((listing) => {
    const bid = getLastItem(listing.bids, "No Bids");

    if (bid.amount) {
      return (document.querySelector(".listings-container").innerHTML +=
        listingsHTML(
          listing.media,
          listing.title,
          listing.seller.name,
          listing.endsAt,
          bid.amount,
          listing.id
        ));
    } else {
      return (document.querySelector(".listings-container").innerHTML +=
        listingsHTML(
          listing.media,
          listing.title,
          listing.seller.name,
          listing.endsAt,
          bid,
          listing.id
        ));
    }
  });
}

displayListings();
