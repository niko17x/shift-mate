import { useEffect, useState } from "react";
import useFetchEmployeeProfile from "../../hooks/manageEmployees.hooks/useFetchEmployeeProfile";
import Loader from "../common/Loader";

const EmployeeProfile = ({ selectedEmployeeId }) => {
  const [profileDataForm, setProfileDataForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tenure: "",
    eCode: "",
    jobTitle: "",
    employeeTime: "",
  });
  const { employeeProfile, isLoading } = useFetchEmployeeProfile();

  useEffect(() => {
    const getEmployeeProfile = async () => {
      const employee = await employeeProfile(selectedEmployeeId);

      if (employee) {
        setProfileDataForm((prev) => ({
          ...prev,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          tenure: employee.tenure,
          eCode: employee.eCode,
          jobTitle: employee.jobTitle,
          employeeTime: employee.employeeTime,
        }));
      }
    };

    selectedEmployeeId && getEmployeeProfile();
  }, [selectedEmployeeId]);

  const handleSubmit = () => {};
  const handleFormData = () => {};

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <div className="register-page container box">
      <h1 className="title is-2">Employee Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className={`input`}
              type="text"
              placeholder="John"
              value={profileDataForm.firstName}
              name="firstName"
              onChange={handleFormData}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className={`input`}
              type="text"
              placeholder="Doe"
              value={profileDataForm.lastName}
              name="lastName"
              onChange={handleFormData}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-right">
            <input
              className={`input`}
              type="email"
              placeholder="john_doe@email.com"
              value={profileDataForm.email}
              name="email"
              onChange={handleFormData}
              disabled={true}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Current Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              minLength="8"
              value={profileDataForm.password}
              onChange={handleFormData}
              disabled={true}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">New Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={profileDataForm.newPassword}
              minLength="8"
              disabled={true}
              onChange={handleFormData}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Tenure</label>
          <div className="control">
            <input
              className={`input`}
              type="number"
              placeholder="10"
              value={profileDataForm.tenure}
              name="tenure"
              onChange={handleFormData}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Ecode</label>
          <div className="control">
            <input
              className={`input`}
              type="text"
              placeholder="E010J"
              minLength={5}
              maxLength={5}
              value={profileDataForm.eCode}
              name="eCode"
              disabled={true}
              onChange={handleFormData}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Job Title</label>
          <div className="control">
            <div className="select">
              <select
                name="jobTitle"
                value={profileDataForm.jobTitle}
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
        </div>

        <div className="field">
          <label className="label">Employee Time</label>
          <div className="control">
            <div className="select">
              <select
                name="isFullTime"
                onChange={handleFormData}
                value={profileDataForm.isFullTime}
              >
                <option value="true">Full Time</option>
                <option value="false">Part Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              // disabled={!allowSave}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeProfile;