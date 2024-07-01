import React, { useState } from "react";
import Calendar from "react-calendar";
import { DateTime } from "luxon";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    // result => _DateTime {ts: 1718953200000, _zone: _SystemZone, loc: _Locale, invalid: null, weekData: null, …}:
    const luxonDate = DateTime.fromJSDate(selectedDate);

    // result => 6-29-2024:
    console.log(
      // `Selected date: ${luxonDate.toLocaleString(DateTime.DATE_MED)}`
      // `Selected date: ${luxonDate.toLocaleString(DateTime.toISODate())}`

      // correct format to receive in schedule.controller model:
      `${luxonDate.toISODate()}`
    );
    setDate(selectedDate);
  };

  return (
    <div className="calendar-ui">
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default MyCalendar;
