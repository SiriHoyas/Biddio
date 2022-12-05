import { convertEndtime } from "../../time/convertEndtime.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { getListings } from "../../api/fetch/fetchListings.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.js";

async function displayListings() {
  const listings = await getListings(`&offset=0`);

  for (let i = 0; i < listings.length; i++) {
    const bid = getLastItem(listings[i].bids, "No Bids");
    const { date, month, year, hours, minutes, seconds } = convertEndtime(
      listings[i].endsAt
    );

    if (i <= 26) {
      if (bid.amount) {
        document.querySelector(".listings-container").innerHTML += listingsHTML(
          listings[i].media,
          listings[i].title,
          listings[i].seller.name,
          date,
          month,
          year,
          hours,
          minutes,
          seconds,
          bid.amount,
          listings[i].id
        );
      } else {
        document.querySelector(".listings-container").innerHTML += listingsHTML(
          listings[i].media,
          listings[i].title,
          listings[i].seller.name,
          date,
          month,
          year,
          hours,
          minutes,
          seconds,
          bid,
          listings[i].id
        );
      }
    }
  }
}

displayListings();

let offset = 10;

async function showMore() {
  offset = offset + 10;

  const listings = await getListings(`&offset=${offset}`);
  for (let i = 0; i < listings.length; i++) {
    const bid = getLastItem(listings[i].bids, "No Bids");
    const { date, month, year, hours, minutes, seconds } = convertEndtime(
      listings[i].endsAt
    );

    if (i <= 26) {
      if (bid.amount) {
        document.querySelector(".listings-container").innerHTML += listingsHTML(
          listings[i].media,
          listings[i].title,
          listings[i].seller.name,
          date,
          month,
          year,
          hours,
          minutes,
          seconds,
          bid.amount,
          listings[i].id
        );
      } else {
        document.querySelector(".listings-container").innerHTML += listingsHTML(
          listings[i].media,
          listings[i].title,
          listings[i].seller.name,
          date,
          month,
          year,
          hours,
          minutes,
          seconds,
          bid,
          listings[i].id
        );
      }
    }
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    showMore();
  }
});
