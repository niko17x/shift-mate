import { useEffect } from "react";
import useFetchEmployeeSchedule from "../../hooks/schedule.hooks/useFetchEmployeeSchedule";
import EmployeeGrid from "./EmployeeGrid";
import getWeekNumber from "../../utils/getWeekNumber";

// TODO => Implement option to add employee to schedule.

const DisplayEmployeeGrid = () => {
  const { fetchEmployeeSchedule } = useFetchEmployeeSchedule();
  const result = getWeekNumber("2024-01-22");
  // console.log(result);

  useEffect(() => {
    const employeeSchedule = async () => {
      const bar = await fetchEmployeeSchedule(
        "66ca51faa0fe526c3e278ad3",
        "2024",
        "1"
      );
      // console.log(bar);
    };

    employeeSchedule();
  }, []);

  return (
    <div className="display-dates">
      <EmployeeGrid />
    </div>
  );
};

export default DisplayEmployeeGrid;
