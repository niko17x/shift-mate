import { useState } from "react";
import { toast } from "react-toastify";
import handleRegisterInputErrors from "../utils/handleRegisterInputErrors";
import useFetchCreateEmployee from "../hooks/manageEmployees.hooks/useFetchCreateEmployee";
import DisplayEmployees from "../components/employeePage/DisplayEmployees";

const ManageEmployeesPage = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const { errors, createEmployee } = useFetchCreateEmployee();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    isFullTime: "",
    tenure: "",
    eCode: "",
  });

  const { getInputClass, getErrorMessageText } =
    handleRegisterInputErrors(errors);

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createEmployee(formData);

    if (!result.success) {
      toast.error(result.error, {
        toastId: "create-employee-fail",
      });
      return;
    }

    toast.success("Employee created successfully", {
      toastId: "create-employee-success",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      isFullTime: "",
      tenure: "",
      eCode: "",
    });
  };

  return (
    <div className="register-page container box">
      <h1 className="title is-1">Create Employee</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className={`input ${getInputClass("firstName")}`}
              type="text"
              placeholder="John"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessageText("firstName")}</p>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className={`input ${getInputClass("lastName")}`}
              type="text"
              placeholder="Doe"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessageText("lastName")}</p>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-right">
            <input
              className={`input ${getInputClass("email")}`}
              type="email"
              placeholder="john_doe@email.com"
              name="email"
              value={formData.email || ""}
              onChange={handleFormData}
            />
            <p className="help is-danger">{getErrorMessageText("email")}</p>
          </div>
        </div>
        <div className="field">
          <label className="label">Tenure</label>
          <div className="control">
            <input
              className={`input ${getInputClass("tenure")}`}
              type="number"
              placeholder="10"
              name="tenure"
              value={formData.tenure || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessageText("tenure")}</p>
        </div>
        <div className="field">
          <label className="label">Ecode</label>
          <div className="control">
            <input
              className={`input ${getInputClass("eCode")}`}
              type="text"
              placeholder="E010J"
              name="eCode"
              value={formData.eCode || ""}
              maxLength={5}
              onChange={handleFormData}
            />
            <p className="help is-danger">{getErrorMessageText("eCode")}</p>
          </div>
        </div>
        <div className="field">
          <label className="label">Job Title</label>
          <div className="control">
            <div className="select">
              <select
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleFormData}
              >
                <option value="">Select dropdown</option>
                <option value="sales">Sales</option>
                <option value="software">Software</option>
                <option value="management">Management</option>
                <option value="operations">Operations</option>
                <option value="administration">Administration</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <p className="help is-danger">{getErrorMessageText("jobTitle")}</p>
        </div>

        <div className="field">
          <label className="label">Employee Time</label>
          <div className="control">
            <div className="select">
              <select
                name="isFullTime"
                value={formData.isFullTime}
                onChange={handleFormData}
              >
                <option value="default">Select dropdown</option>
                <option value="true">Full Time</option>
                <option value="false">Part Time</option>
              </select>
            </div>
          </div>
          <p className="help is-danger">{getErrorMessageText("isFullTime")}</p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>

      <DisplayEmployees
        toggleModal={toggleModal}
        openModal={() => setToggleModal(true)}
        closeModal={() => setToggleModal(false)}
      />
    </div>
  );
};

export default ManageEmployeesPage;
