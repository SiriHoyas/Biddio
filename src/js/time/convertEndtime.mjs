export function convertEndtime(endsAt) {
  const convertTimezone = getTimeZone(endsAt);
  const endTime = new Date(convertTimezone);
  endTime.toISOString();

  // const date = endTime.getDate();
  // const month = endTime.getMonth() + 1;
  // const year = endTime.getFullYear();
  // const hours = endTime.getHours();
  // const minutes = endTime.getMinutes();
  // const seconds = endTime.getSeconds();

  const date = endTime.toLocaleDateString();
  const time = endTime.toLocaleTimeString();
  return { date, time };

  // return { date, month, year, hours, minutes, seconds };
}

function getTimeZone(endDate) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;

  return endDate.toLocaleString(`${locale}`, { timeZone: `${timeZone}` });
}
