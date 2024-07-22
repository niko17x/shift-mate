import getDaysOfWeek from "../../utils/getDaysOfWeek";
import getWeekNumber from "../../utils/getWeekNumber";
import CreateGrid from "./CreateGrid";
import useSelectedDate from "../../hooks/calendar/useSelectedDate";

const DisplayDates = (data, weekNum) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const defaultWeekNum = getWeekNumber(formattedDate);
  const defaultDays = getDaysOfWeek(formattedDate, defaultWeekNum);

  const { date } = useSelectedDate();

  return (
    <div className="display-dates">
      <CreateGrid data={defaultDays} />
    </div>
  );
};

export default DisplayDates;
