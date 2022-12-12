import { getLocalStorage } from "../../components/getLocalstorage.mjs";
import { fetchContent } from "../fetch/fetchContent.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingID = params.get("id");

const { accessToken } = getLocalStorage();

const editForm = document.querySelector(".edit-listing-form");
const editBtn = document.querySelector(".edit-btn");
const delBtn = document.querySelector(".delete-btn");
const editModal = document.querySelector(".edit-listing-modal");

editBtn.addEventListener("click", () => {
  editModal.classList.remove("hidden");
  document.querySelector("body").classList.add("overflow-hidden");
});

async function editListing(e) {
  e.preventDefault();
  const titleInput = document.querySelector("#edit-title").value;
  const descriptionInput = document.querySelector("#edit-description").value;

  let body = {
    title: titleInput,
    description: descriptionInput,
  };

  if (titleInput.length < 1) {
    body = {
      description: descriptionInput,
    };
  } else if (descriptionInput.length < 1) {
    body = {
      title: titleInput,
    };
  }

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };

  const response = await fetchContent(`/listings/${listingID}`, options);

  if (response.ok) {
    editModal.classList.add("hidden");
    window.location.reload();
  }
}

async function deleteListing(e) {
  e.preventDefault();
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await fetchContent(`/listings/${listingID}`, options);

  if (response.ok) {
    history.back();
  }
}

editForm.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === editBtn) {
    editListing(e);
  } else if (e.target === delBtn) {
    deleteListing(e);
  }
});

editModal.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editModal.classList.add("hidden");
    document.querySelector("body").classList.remove("overflow-hidden");
  }
});
