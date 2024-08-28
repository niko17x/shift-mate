import { useState } from "react";
import EmployeeProfile from "../components/manageEmployeePage/EmployeeProfile";
import DisplayEmployeeList from "../components/manageEmployeePage/DisplayEmployeeList";

const ManageEmployeesPage = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleSelectEmployeeId = (id) => {
    setSelectedEmployeeId(id);
  };

  return (
    <div className="manage-employees-page box">
      <div className="edit-employee-profile">
        <EmployeeProfile selectedEmployeeId={selectedEmployeeId} />
        <DisplayEmployeeList selectEmployeeId={handleSelectEmployeeId} />
      </div>
    </div>
  );
};

export default ManageEmployeesPage;

// TODO => Change Manage Employee page to show employee stats (hours worked, employees on leave, etc...), include buttons for creating new employees, viewing employees, editing employees (maybe?).
