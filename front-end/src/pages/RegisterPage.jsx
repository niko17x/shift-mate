import { useState } from "react";
import useRegisterUser from "../hooks/auth/useRegisterUser";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    jobTitle: "",
    isFullTime: "",
    tenure: "",
    notes: "",
    eCode: "",
  });

  const { registerUser, errors } = useRegisterUser();

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.isFullTime === "Full Time"
      ? (formData.isFullTime = true)
      : (formData.isFullTime = false);

    registerUser(formData);
  };

  const handleInputErrors = (field) => {
    const errorFound = errors?.find((err) => err.field === field);
    if (errorFound) {
      return "is-warning";
    }
  };

  return (
    <div className="register-page container">
      <h1 className="title is-1">Register</h1>

      <form action="" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="John"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormData}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Doe"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormData}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("username")}`}
              type="text"
              placeholder="johnDoe01"
              name="username"
              value={formData.username}
              onChange={handleFormData}
            ></input>
            {handleInputErrors("username") && (
              <p className="help is-warning">Username already taken</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-right">
            <input
              className={`input ${handleInputErrors("email")}`}
              type="email"
              placeholder="john_doe@email.com"
              name="email"
              value={formData.email}
              onChange={handleFormData}
            ></input>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
            {handleInputErrors("email") && (
              <p className="help is-warning">Email already taken</p>
            )}
          </div>
          {/* {emailExist ? (
          <p className="help is-danger">This email is invalid</p>
        ) : (
          <p className="help is-success">Email is available</p>
        )} */}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              minLength="5"
              value={formData.password}
              onChange={handleFormData}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Job Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Software Engineer"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleFormData}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Tenure</label>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="10"
              name="tenure"
              value={formData.tenure}
              onChange={handleFormData}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label">Ecode</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("eCode")}`}
              type="text"
              placeholder="E010J"
              name="eCode"
              value={formData.eCode}
              onChange={handleFormData}
            ></input>
            {handleInputErrors("eCode") && (
              <p className="help is-warning">Ecode already taken</p>
            )}
          </div>
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
                <option>Select dropdown</option>
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Notes</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Textarea"
              name="notes"
              value={formData.notes}
              onChange={handleFormData}
            ></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
