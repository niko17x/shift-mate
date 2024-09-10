import DisplayDateGrid from "../components/schedulerPage/DisplayDateGrid.jsx";
import DisplayEmployeeGrid from "../components/schedulerPage/DisplayEmployeeGrid.jsx";
import CalendarUi from "../components/calendar/CalendarUi.jsx";

const SchedulerPage = () => {
  const isUserLoggedIn = localStorage.getItem("user");

  if (!isUserLoggedIn) {
    return <div>Sign in to view scheduler</div>;
  }

  // Todo => Getting calendar UI with MUI to work. Nothing is displaying.
  return (
    <div className="scheduler-page">
      <div className="grid-container">
        <DisplayDateGrid />
        <DisplayEmployeeGrid />
      </div>
      <CalendarUi />
    </div>
  );
};

export default SchedulerPage;
