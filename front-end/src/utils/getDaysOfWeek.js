import { DateTime } from "luxon";

// Retrieving all days for the given week number:
const getDaysOfWeek = (date, weekNumber) => {
  const year = date.split("-")[0];

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

  return weekDays;
};

export default getDaysOfWeek;
