export function showError(container) {
  container.innerHTML = `
    <div class="error-message font-mainFont text-red-800 ">
        <p>Something went wrong.</p>
        <p>Please try again later</p>
  </div>
    
    `;
}
