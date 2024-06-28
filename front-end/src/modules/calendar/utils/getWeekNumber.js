import { DateTime } from "luxon";

// * Retrieving week number with a given date:
const getWeekNumber = (year, month, day) => {
  // Create a DateTime object for the given date
  const date = DateTime.local(year, month, day);

  // Retrieve the week number
  const weekNumber = date.weekNumber;

  console.log(weekNumber);
  return weekNumber;
};

/**
RESULT:
function: getWeekNumber(2024, 12, 29);
Monday, December 23, 2024
Tuesday, December 24, 2024
Wednesday, December 25, 2024
Thursday, December 26, 2024
Friday, December 27, 2024
Saturday, December 28, 2024
Sunday, December 29, 2024
 */

export default getWeekNumber;
