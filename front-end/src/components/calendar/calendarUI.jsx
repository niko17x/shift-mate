import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useSelectedDate from "../../hooks/calendar/useSelectedDate";
import DisplayDates from "../schedulerPage/DisplayDates";

const MyCalendar = () => {
  const { date, handleDateChange } = useSelectedDate();

  // DisplayDates(date, 22);

  return (
    <div className="calendar-ui">
      <Calendar
        onChange={handleDateChange}
        value={date ? new Date(date) : null}
      />
    </div>
  );
};

export default MyCalendar;
