export let urlArray = [];

const addBtn = document.querySelector(".add-photos-btn");
const imagePreviewContainer = document.querySelector(
  ".image-preview-container"
);

// ADD TO ARRAY
function addToArray() {
  const inputField = document.querySelector("#url-input");

  if (inputField.value.length > 0) {
    urlArray.push(inputField.value);
    inputField.value = "";
    imagePreviewContainer.innerHTML = "";
  }
}

// SHOW ARRAY
function renderImages() {
  imagePreviewContainer.innerHTML = urlArray
    .map((source, index) => {
      return `
      <div class="listingImg w-10 h-10 md:w-32 md:h-32" id="${index}">
        <img class="w-10 h-10 object-cover md:w-32 md:h-32" src="${source}" />
      </div> `;
    })
    .join("");
}

// TARGET ELEMENTS

/**
 * @overview
 *  The click event listens for clicks on the parent element.
 * If the element being clicked has the listingImg class (which all images added with add button gets).
 * The listings are also given an ID, which are the index of the images in the urlArray.
 * If the image with ID 0 is clicked, it is passed in to the deleteImage() function, that filters and re-render the new array. */

imagePreviewContainer.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (!parentElement.className.includes("listingImg")) return;

  const image = parentElement;
  const imageId = Number(image.id);

  deleteImage(imageId);
});

// DELETE ELEMENT
function deleteImage(imageId) {
  urlArray = urlArray.filter((src, i) => i !== imageId);

  renderImages();
}

// USER FEEDBACK ON IMAGES ADDED
addBtn.addEventListener("click", () => {
  addToArray();
  renderImages();

  document.querySelector(
    ".num-photos-added"
  ).innerHTML = `${urlArray.length} photos added`;
});
