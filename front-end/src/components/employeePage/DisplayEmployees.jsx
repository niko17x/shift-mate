import useFetchAllEmployees from "../../hooks/createEmployee.hooks/useFetchAllEmployees";
import Loader from "../common/Loader";

const DisplayEmployees = ({ toggleModal, closeModal, openModal }) => {
  // const [employees, setEmployees] = useState([]);
  const { isLoading, employees } = useFetchAllEmployees();

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  console.log(employees);

  return (
    <div className="display-employees">
      <div onClick={openModal}>
        <p>View Employees</p>
      </div>
      <div className={`modal ${toggleModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {/* <h1>Displaying employees</h1> */}
          <p className="title is-3">Employee List</p>
          {/* Map and display employees here */}
          {employees &&
            employees.map((emp) => (
              <div className="employee-list" key={emp._id}>
                <p>
                  {emp.lastName}, <span>{emp.firstName}</span>{" "}
                </p>
                <p>{emp.email}</p>
                <p>{emp.jobTitle}</p>
                <p>{emp.isFullTime}</p>
                <p>{emp.tenure}</p>
                <p>{emp.updatedAt}</p>
                <p>{emp.eCode}</p>
                <div className="divider"></div>
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

// TODO => 1. Delete employee in list // 2. Edit employee detail by providing link in list.
// Keep styling simple in the beginning. Business logic is what matters at first.
