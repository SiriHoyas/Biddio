import { convertEndtime } from "../../time/convertEndtime.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getListings } from "../../api/fetch/fetchListings.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";

async function displayListings() {
  const listings = await getListings(`&offset=0&limit=27`);
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

let offset = 10;

async function showMore() {
  offset = offset + 10;

  const listings = await getListings(`&offset=${offset}&limit=27`);
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

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    showMore();
  }
});
