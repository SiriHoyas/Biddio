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

imagePreviewContainer.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (!parentElement.className.includes("listingImg")) return;

  const image = parentElement;
  const imageId = Number(image.id);
  console.log(imageId);

  deleteImage(imageId);
});

// DELETE ELEMENT

function deleteImage(imageId) {
  urlArray = urlArray.filter((src, i) => i !== imageId);

  renderImages();
}

addBtn.addEventListener("click", () => {
  addToArray();
  renderImages();

  document.querySelector(
    ".num-photos-added"
  ).innerHTML = `${urlArray.length} photos added`;
});
