import getDaysOfWeek from "../../utils/getDaysOfWeek";
import getWeekNumber from "../../utils/getWeekNumber";
import DateGrid from "./DateGrid";
// import useSelectedDate from "../../hooks/calendar/useSelectedDate";

const DisplayDateGrid = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const defaultWeekNum = getWeekNumber(formattedDate);
  const defaultDays = getDaysOfWeek(formattedDate, defaultWeekNum);

  // console.log(formattedDate);
  // const { date } = useSelectedDate();

  return (
    <div className="display-dates">
      <DateGrid data={defaultDays} />
    </div>
  );
};

export default DisplayDateGrid;

/**
 * By default, current date (current weekNum) will be displayed on Scheduler page.
 * Different date can be selected when user uses calendar to select day/week.
 */
