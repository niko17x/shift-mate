import { useState } from "react";
import getDaysOfWeek from "../../utils/getDaysOfWeek";
import getWeekNumber from "../../utils/getWeekNumber";

const DisplayDates = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const defaultWeekNum = getWeekNumber(formattedDate);
  const defaultDays = getDaysOfWeek(formattedDate, defaultWeekNum);

  return (
    <div className="display-dates box">
      {defaultDays.map((days, index) => (
        <div className="display-days" key={index}>
          <p>{days.dayOfWeek}</p>
          <p>{days.ordinalDate}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayDates;
