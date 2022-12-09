import { countDown } from "./auctionCountdown.mjs";

export async function displayCountdown(endsAt) {
  const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = countDown(endsAt);

  const countdown = document.querySelector(".countdown");
  countdown.innerHTML = `
    <div class="flex justify-between">
      <p>${daysLeft}</p>
      <p>${hoursLeft}</p>
      <p>${minutesLeft}</p>
      <p>${secondsLeft}</p>
    </div>
    `;
}
