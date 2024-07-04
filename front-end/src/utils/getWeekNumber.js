import { DateTime } from "luxon";

// Retrieving week number with a given date:
const getWeekNumber = (date) => {
  const splitDate = date.split("-");

  const year = Number(splitDate[0]);
  const month = Number(splitDate[1]);
  const day = Number(splitDate[2]);

  // Create a DateTime object for the given date
  const luxonDate = DateTime.local(year, month, day);

  // Retrieve week number from Luxon
  const weekNumber = luxonDate.weekNumber;

  return weekNumber;
};

export default getWeekNumber;
