import { urlArray } from "../../api/listings/addListingImg.mjs";
import { fetchContent } from "../../api/fetch/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { setEndTime } from "../../time/setEndTime.mjs";

async function addListing(e) {
  try {
    e.preventDefault();
    const { accessToken } = getLocalStorage();
    const titleInput = document.querySelector("#listing-title").value;
    const descriptionInput = document.querySelector(
      "#listing-description"
    ).value;

    if (!titleInput.length) {
      document.querySelector(".title-error").classList.remove("hidden");
    }

    const endsAt = sessionStorage.getItem("endTime");

    const newPostBody = {
      title: titleInput,
      description: descriptionInput,
      media: urlArray,
      endsAt: endsAt,
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
      document.querySelector(".post-success").classList.add("flex");
    }
  } catch (error) {
    document.querySelector(".new-listing-container").classList.add("hidden");
    document.querySelector(".error-message").classList.remove("hidden");
    console.log("This is error");
  }
}

const form = document.querySelector(".new-listing-form");

form.addEventListener("submit", (e) => {
  addListing(e);
});

// Set endtime
let endDate;
const btnParent = document.querySelector(".auction-duration-container");

btnParent.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-duration")) {
    const duration = e.target.dataset.duration;
    const durationNum = parseInt(duration);
    endDate = setEndTime(durationNum);
    sessionStorage.setItem("endTime", endDate);
    const formattedEndDate = new Date(endDate).toLocaleString("en-GB", {
      timeZone: "UTC",
    });

    document.querySelector(".view-endtime").innerHTML = `${formattedEndDate}`;
  }
});

// Refresh on error

document.querySelector(".refresh-btn").addEventListener("click", () => {
  window.location.reload();
});
