import { useEffect, useState } from "react";
import useFetchAllEmployees from "../../hooks/manageEmployees.hooks/useFetchAllEmployees";
import useFetchDeleteEmployee from "../../hooks/manageEmployees.hooks/useFetchDeleteEmployee";
import useFetchEmployeeProfile from "../../hooks/manageEmployees.hooks/useFetchEmployeeProfile";
import Loader from "../common/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DisplayEmployees = ({ toggleModal, closeModal, openModal }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const { isLoading: isLoadingEmployees, fetchAllEmployees } =
    useFetchAllEmployees();
  const {
    isLoading: isDeleting,
    error: errorDeleting,
    deleteEmployee,
    data,
  } = useFetchDeleteEmployee();

  // TODO => Decide on UI to view employee profile data as admin. What makes most sense?
  // ! Experimenting w/ employee profile data retrieval (to be deleted):
  const { employeeProfile } = useFetchEmployeeProfile();
  const handleThisClick = async (emp) => {
    console.log(emp._id);
    const bar = await employeeProfile(emp._id);
    console.log(bar);
  };
  // !

  useEffect(() => {
    const getEmployeeList = async () => {
      if (toggleModal) {
        const employees = await fetchAllEmployees();
        if (employees) {
          setEmployeeList(employees.data);
        }
      }
    };

    getEmployeeList();
  }, [toggleModal, data]);

  const handleDelete = async (employeeId) => {
    await deleteEmployee(employeeId._id);

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
    <div className="display-employees">
      <div onClick={openModal}>
        <p>View Employees</p>
      </div>
      <div className={`modal ${toggleModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <p className="title is-3">Employee List</p>
          {employeeList &&
            employeeList.map((emp) => (
              <div className="employee-list" key={emp._id}>
                <div className="notification is-info">
                  <button
                    className="delete"
                    onClick={() => handleDelete(emp)}
                  ></button>
                  <Link to={`/profile/${emp._id}`}>
                    <p>
                      {emp.lastName}, <span>{emp.firstName}</span>{" "}
                    </p>
                  </Link>
                  <p>{emp.email}</p>
                  <p>{emp.jobTitle}</p>
                  <p>{emp.isFullTime}</p>
                  <p>{emp.tenure}</p>
                  <p>{emp.eCode}</p>
                  <button onClick={() => handleThisClick(emp)}>click me</button>
                </div>
              </div>
            ))}
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={closeModal}
        ></button>
      </div>
    </div>
  );
};

export default DisplayEmployees;

// * Keep styling simple in the beginning. Business logic is what matters at first.
// TODO => Manage case for quick employee deletion causing issues. Ask GPT.
