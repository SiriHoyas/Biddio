import { convertEndtime } from "../../components/convertEndtime.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getListings } from "../../components/getlistings.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";

async function displayListings() {
  const listings = await getListings();
  console.log(listings);

  listings.map((listing) => {
    const bid = getLastItem(listing.bids, "No Bids");
    const { date, month, year, hours, minutes, seconds } = convertEndtime(
      listing.endsAt
    );

    if (bid.amount) {
      return (document.querySelector(".listings-container").innerHTML +=
        listingsHTML(
          listing.media,
          listing.title,
          listing.seller.name,
          date,
          month,
          year,
          hours,
          minutes,
          seconds,
          bid.amount,
          listing.id
        ));
    } else {
      return (document.querySelector(".listings-container").innerHTML +=
        listingsHTML(
          listing.media,
          listing.title,
          listing.seller.name,
          date,
          month,
          year,
          hours,
          minutes,
          seconds,
          bid,
          listing.id
        ));
    }
  });
}

displayListings();
