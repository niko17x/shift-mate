import React, { useState } from "react";
import Calendar from "react-calendar";
import { DateTime } from "luxon";
import "react-calendar/dist/Calendar.css";
import getWeekNumber from "../../utils/getWeekNumber";
import getDaysOfWeek from "../../utils/getDaysOfWeek";

const MyCalendar = () => {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    // result => _DateTime {ts: 1718953200000, _zone: _SystemZone, loc: _Locale, invalid: null, weekData: null, …}:
    const luxonDate = DateTime.fromJSDate(selectedDate);

    const formattedDate = luxonDate.toISODate();

    setDate(formattedDate);
  };

  if (date) {
    const weekNum = getWeekNumber(date);

    getDaysOfWeek(date, weekNum);
  }

  return (
    <div className="calendar-ui">
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;

// api call to change current auth user 'focusedWeekNum'.
// api call retrieve current auth user 'focusedWeekNum' for client side display.
