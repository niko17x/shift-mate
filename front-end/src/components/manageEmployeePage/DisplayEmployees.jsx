import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import useFetchAllEmployees from "../../hooks/manageEmployees.hooks/useFetchAllEmployees";
import useFetchDeleteEmployee from "../../hooks/manageEmployees.hooks/useFetchDeleteEmployee";
import CreateEmployeeForm from "./AddEmployeeForm";

const DisplayEmployees = ({ selectEmployeeId }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const { isLoading: isLoadingEmployees, fetchAllEmployees } =
    useFetchAllEmployees();
  const {
    isLoading: isDeleting,
    error: errorDeleting,
    deleteEmployee,
    data,
  } = useFetchDeleteEmployee();

  useEffect(() => {
    const getEmployeeList = async () => {
      const employees = await fetchAllEmployees();
      if (employees) {
        setEmployeeList(employees);
      }
    };

    getEmployeeList();
  }, [data, selectEmployeeId]);

  const handleDelete = async (employee) => {
    await deleteEmployee(employee._id);

    console.log("errorDeleting:", errorDeleting);
    console.log("data:", data);

    if (errorDeleting || !data) {
      toast.error("Failed to delete employee", {
        toastId: "delete-employee-fail",
      });
      return;
    }

    toast.success("Employee successfully deleted", {
      toastId: "delete-employee-success",
    });
  };

  if (isLoadingEmployees || isDeleting) {
    return <Loader loading={isLoadingEmployees} />;
  }

  return (
    <div className="display-employees box">
      <p className="title is-2">Employee List</p>

      <CreateEmployeeForm selectEmployeeId={selectEmployeeId} />

      {employeeList.length > 0 ? (
        employeeList.map((emp) => (
          <div className="employee-list" key={emp._id}>
            <div
              className="notification"
              onClick={() => selectEmployeeId(emp._id)}
            >
              <button
                className="delete"
                onClick={() => handleDelete(emp)}
              ></button>
              <p>
                {emp.lastName}, <span>{emp.firstName}</span>{" "}
              </p>
              <p>{emp.email}</p>
              <p>{emp.jobTitle}</p>
              <p>{emp.isFullTime}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="title is-4">The list is empty!</div>
      )}
    </div>
  );
};

export default DisplayEmployees;

// * Keep styling simple in the beginning. Business logic is what matters at first.
// TODO => Manage case for quick employee deletion causing issues. Ask GPT.
