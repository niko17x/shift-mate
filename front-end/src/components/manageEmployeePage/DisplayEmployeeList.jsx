import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import useFetchAllEmployees from "../../hooks/manageEmployees.hooks/useFetchAllEmployees";
import useFetchDeleteEmployee from "../../hooks/manageEmployees.hooks/useFetchDeleteEmployee";
import CreateEmployeeForm from "./AddEmployeeForm";
import FilterEmployeeList from "./FilterEmployeeList";

const DisplayEmployeeList = ({ selectEmployeeId }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [filterKey, setFilterKey] = useState("updatedAt-desc");
  const [filterBy, setFilterBy] = useState({
    sortBy: "updatedAt",
    order: "desc",
  });
  const { isLoading: isLoadingEmployees, fetchAllEmployees } =
    useFetchAllEmployees();
  const {
    isLoading: isDeleting,
    error: errorDeleting,
    deleteEmployee,
    data,
  } = useFetchDeleteEmployee();

  useEffect(() => {
    const getEmployees = async () => {
      const { sortBy, order } = filterBy;
      const employees = await fetchAllEmployees(sortBy, order);
      if (employees) {
        setEmployeeList(employees);
      }
    };
    getEmployees();
  }, [filterBy, selectEmployeeId]);

  const handleFiltering = useCallback((filter, selectedKey) => {
    setFilterBy(filter);
    setFilterKey(selectedKey);
  }, []);

  const handleDelete = async (employee) => {
    const result = await deleteEmployee(employee._id);

    if (errorDeleting || !result) {
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
    return <Loader loading={isLoadingEmployees || isDeleting} />;
  }

  return (
    <div className="display-employees box">
      <p className="title is-2">Employee List</p>

      <CreateEmployeeForm selectEmployeeId={selectEmployeeId} />
      <FilterEmployeeList
        handleFiltering={handleFiltering}
        filterKey={filterKey}
      />

      {employeeList.length > 0 ? (
        employeeList.map((emp) => (
          <div className="employee-list" key={emp._id}>
            <div
              className="notification"
              onClick={() => selectEmployeeId(emp._id)}
            >
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(emp);
                }}
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

export default DisplayEmployeeList;

/**
 * Notes:
 * 1. When using a dependency in a useEffect (w/ fetch) leads to perpetual rendering, wrap fetch with useCallback to prevent re-rendering.
 */
