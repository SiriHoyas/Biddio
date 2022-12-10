import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { fetchContent } from "../fetch/fetchContent.mjs";

async function fetchCredits() {
  const { userName, accessToken } = getLocalStorage();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await fetchContent(`/profiles/${userName}/credits`, options);

  const json = await response.json();

  localStorage.setItem("userCredits", json.credits);
}

setInterval(fetchCredits, 3600000);
