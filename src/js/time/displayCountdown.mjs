import { countDown } from "./auctionCountdown.mjs";

export async function displayCountdown(endsAt) {
  const endTime = Date.parse(endsAt);

  const currentTime = new Date().getTime();
  const diff = endTime - currentTime;

  const countdown = document.querySelector(".countdown");

  if (diff <= 0) {
    countdown.innerHTML = `
    <p class="font-mainFont text-xl dark:text-offWhite">Auction Expired</p>
    `;
    document.querySelector(".ends-in-title").classList.add("hidden");
  } else {
    const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = countDown(endsAt);

    countdown.innerHTML = `
      <div class="flex  font-mainFont text-xl dark:text-offWhite">
        <p class="mr-2">${daysLeft}d</p>
        <p class="mr-2">${hoursLeft}h</p>
        <p class="mr-2">${minutesLeft}m</p>
        <p class="mr-2">${secondsLeft}s</p>
      </div>
      `;
  }
}
