import React, { useState } from "react";
import Calendar from "react-calendar";
import { DateTime } from "luxon";
import "react-calendar/dist/Calendar.css";
import getWeekNumber from "../utils/getWeekNumber";

const MyCalendar = () => {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    // result => _DateTime {ts: 1718953200000, _zone: _SystemZone, loc: _Locale, invalid: null, weekData: null, …}:
    const luxonDate = DateTime.fromJSDate(selectedDate);

    const formattedDate = luxonDate.toISODate();

    setDate(formattedDate);
  };

  if (date) {
    getWeekNumber(date);
  }

  return (
    <div className="calendar-ui">
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
