import { getListings } from "../fetch/fetchListings.mjs";
import { listingsHTML } from "../../components/templates/listingsTemplate.mjs";
import { getLastItem } from "../../components/getLatestBid.mjs";
import { convertEndtime } from "../../time/convertEndtime.mjs";

async function getLastestListings() {
  const container = document.querySelector(".latest-listings-container");
  try {
    const listings = await getListings("_active=true");

    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const bid = await getLastItem(listings[i].bids, "No Bids");
      console.log(listings[i].id);
      const { date, time } = convertEndtime(listings[i].endsAt);
      container.innerHTML += listingsHTML(
        listings[i].media[0],
        listings[i].title,
        listings[i].seller.name,
        date,
        time,
        bid.amount ? bid.amount : bid,
        listings[i].id
      );
    }
  } catch (error) {
    document.querySelector(".loader").classList.add("hidden");
    document.querySelector(".catch-error").classList.remove("hidden");
  }
}

getLastestListings();
