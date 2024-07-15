import MyCalendar from "../components/calendar/CalendarUI.jsx";
import DisplayDates from "../components/schedulerPage/DisplayDates.jsx";

const SchedulerPage = () => {
  return (
    <div className="scheduler-page">
      <DisplayDates />
      {/* <MyCalendar /> */}
    </div>
  );
};

export default SchedulerPage;
