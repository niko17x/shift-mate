import { DateTime } from "luxon";

// * Retrieving all days for the given week number:
const getDaysOfWeek = (year, weekNumber) => {
  // Get the first day of the specified week
  const firstDayOfWeek = DateTime.fromObject({
    weekYear: year,
    weekNumber: weekNumber,
    weekday: 1,
  });

  // Collect all days of the specified week
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const dateData = firstDayOfWeek.plus({ days: i });

    weekDays.push({
      ordinalDate: dateData.day,
      month: dateData.month,
      dayOfWeek: dateData.weekdayLong,
    });
  }

  console.log(weekDays);
  return weekDays;
};

/**
RESULT:
function: getDaysOfWeek(2024, 12)
{ordinalDate: 18, month: 3, dayOfWeek: 'Monday'}
 */

export default getDaysOfWeek;
