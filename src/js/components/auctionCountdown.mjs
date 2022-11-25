//json docs

const auctionEnds = "2022-11-25T23:59:00.000Z";

export function countDown(auctionEnds) {
  const endTime = Date.parse(auctionEnds);
  const offset = new Date(auctionEnds).getTimezoneOffset();
  console.log(offset);

  function timeLeft() {
    const currentTime = new Date().getTime();
    const diff = endTime - currentTime;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const daysLeft = Math.floor(diff / day);
    const hoursLeft = Math.floor((diff % day) / hour);
    const minutesLeft = Math.floor((diff % hour) / minute);
    const secondsLeft = Math.floor((diff % minute) / second);
    console.log(daysLeft, hoursLeft, minutesLeft, secondsLeft);

    document.querySelector(".countDown").innerHTML = `
  <p>${daysLeft}<p>
  <p>${hoursLeft}<p>
  <p>${minutesLeft}<p>
  <p>${secondsLeft}<p>
  `;
  }

  setInterval(timeLeft, 1000);
}

countDown(auctionEnds);
