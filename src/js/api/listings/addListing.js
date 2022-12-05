import { urlArray } from "../../api/listings/addListingImg.mjs";
import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { setEndTime } from "../../time/setEndTime.mjs";

let endDate;
const btnParent = document.querySelector(".auction-duration-container");

btnParent.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-duration")) {
    const duration = e.target.dataset.duration;
    const durationNum = parseInt(duration);
    endDate = setEndTime(durationNum);
    document.querySelector(".view-endtime").innerHTML = endDate;
  }
});

async function addListing(e, endDate) {
  try {
    e.preventDefault();
    const { accessToken } = getLocalStorage();
    const titleInput = document.querySelector("#listing-title").value;
    const descriptionInput = document.querySelector(
      "#listing-description"
    ).value;

    console.log(endDate);
    const newPostBody = {
      title: titleInput,
      description: descriptionInput,
      media: urlArray,
      endsAt: endDate,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(newPostBody),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetchContent("/listings", options);

    if (response.ok) {
      document.querySelector(".new-listing-form").classList.add("hidden");
      document.querySelector(".new-listing-heading").classList.add("hidden");
      document.querySelector(".post-success").classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
  }
}

const form = document.querySelector(".new-listing-form");

form.addEventListener("submit", (e) => {
  addListing(e);
});
