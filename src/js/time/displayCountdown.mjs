import { countDown } from "./auctionCountdown.mjs";

export async function displayCountdown(endsAt) {
  const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = countDown(endsAt);

  const countdown = document.querySelector(".countdown");
  countdown.innerHTML = `
    <div class="flex  font-mainFont text-xl dark:text-offWhite">
      <p class="mr-2">${daysLeft}d</p>
      <p class="mr-2">${hoursLeft}h</p>
      <p class="mr-2">${minutesLeft}m</p>
      <p class="mr-2">${secondsLeft}s</p>
    </div>
    `;
}
