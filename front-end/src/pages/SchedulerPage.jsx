import MyCalendar from "../components/calendar/CalendarUI.jsx";
import DisplayDates from "../components/schedulerPage/DisplayDates.jsx";

const SchedulerPage = () => {
  const isUserLoggedIn = localStorage.getItem("user");

  if (!isUserLoggedIn) {
    return <div>Sign in to view scheduler</div>;
  }

  return (
    <div className="scheduler-page">
      <DisplayDates />
      {/* <MyCalendar /> */}
    </div>
  );
};

export default SchedulerPage;
