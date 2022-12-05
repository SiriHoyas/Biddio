import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { fetchContent } from "../fetch/fetchContent.mjs";

document.querySelector(".edit-avatar-btn").addEventListener("click", () => {
  document.querySelector(".edit-avatar").classList.remove("hidden");
});

const editForm = document.querySelector(".edit-avatar-form");

editForm.addEventListener("submit", editProfileAvatar);

async function editProfileAvatar(e) {
  e.preventDefault();

  const urlInput = document.querySelector("#avatar-url").value;

  const { accessToken, userName } = getLocalStorage();

  const body = {
    avatar: `${urlInput}`,
  };

  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetchContent(`/profiles/${userName}/media`, options);
  const json = await response.json();
  console.log(json.avatar);

  if (response.ok) {
    localStorage.setItem("userAvatar", json.avatar);
    window.location.reload();
  }
}
