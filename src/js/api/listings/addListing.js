import { urlArray } from "../../components/addListingImg.mjs";
import { fetchContent } from "../../components/fetchContent.mjs";
import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { setEndTime } from "../../components/setEndTime.mjs";

async function addListing(e) {
  e.preventDefault();
  const { accessToken } = getLocalStorage();
  const titleInput = document.querySelector("#listing-title").value;
  const descriptionInput = document.querySelector("#listing-description").value;

  const endTime = setEndTime(10);

  console.log(urlArray);
  const newPostBody = {
    title: titleInput,
    description: descriptionInput,
    media: urlArray,
    endsAt: endTime,
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
  console.log(await response.json());
}

const form = document.querySelector(".new-listing-form");

console.log(form);

form.addEventListener("submit", (e) => {
  addListing(e);
});
