import { fetchContent } from "../fetch/fetchContent.mjs";

export async function fetchCredits(accessToken, userName) {
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
