export function convertEndtime(endsAt) {
  const convertTimezone = getTimeZone(endsAt);
  const endTime = new Date(convertTimezone);
  endTime.toISOString();

  const date = endTime.toLocaleDateString();
  const time = endTime.toLocaleTimeString();
  console.log(endTime);

  return { date, time };
}

function getTimeZone(endDate) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;

  return endDate.toLocaleString(`${locale}`, { timeZone: `${timeZone}` });
}
