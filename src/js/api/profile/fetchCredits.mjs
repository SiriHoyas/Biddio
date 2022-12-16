import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { displayUserCredits } from "../../UI/navSetUserInfo.mjs";
import { fetchContent } from "../fetch/fetchContent.mjs";

export async function fetchCredits(accessToken, userName) {
  const { userCredits } = getLocalStorage();
  displayUserCredits(userCredits);
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(`/profiles/${userName}/credits`, options);

  if (response.ok) {
    const json = await response.json();
    localStorage.setItem("userCredits", json.credits);

    displayUserCredits(userCredits);
  }
}
