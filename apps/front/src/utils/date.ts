export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getFormattedDate(strDate: string) {
  const date = new Date(strDate);

  const dayOfTheMonth = date.getDate();
  const numberDay = date.getDay();
  const numberMonth = date.getMonth();

  const year = date.getFullYear();

  return {
    numberDay,
    numberMonth,
    dayOfTheMonth,
    year,
    dayOfWeek: daysOfWeek[numberDay],
    month: months[numberMonth],
  };
}
