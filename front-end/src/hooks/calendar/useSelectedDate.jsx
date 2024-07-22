import { useState } from "react";
import { DateTime } from "luxon";

const useSelectedDate = () => {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    const luxonDate = DateTime.fromJSDate(selectedDate);
    const formattedDate = luxonDate.toISODate();
    setDate(formattedDate);
  };

  return {
    date,
    handleDateChange,
  };
};

export default useSelectedDate;
