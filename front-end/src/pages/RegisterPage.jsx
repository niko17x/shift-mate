import { useState } from "react";
import { toast } from "react-toastify";
import useRegisterUser from "../hooks/auth/useRegisterUser";
import usePasswordValidation from "../hooks/auth/usePasswordValidation";
import { Link } from "react-router-dom";

// TODO => PROVIDE PRE-SELECTED JOB TITLES // LIMIT ECODE LENGTH TO 5 // DEFAULT EMPLOYEE TIME TO FULL TIME

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    isFullTime: "",
    tenure: "",
    eCode: "",
  });

  const { registerUser, errors } = useRegisterUser();
  const { validatePasswords, isPasswordsValid } =
    usePasswordValidation(formData);

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "isFullTime" ? value === "Full Time" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    try {
      const modifiedFormData = {
        ...formData,
        isFullTime: formData.isFullTime === "Full Time",
      };

      const isRegisterSuccess = await registerUser(modifiedFormData);

      if (isRegisterSuccess) {
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          jobTitle: "",
          isFullTime: "",
          tenure: "",
          eCode: "",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to register user", {
        toastId: "handle-submit-fail",
      });
    }
  };

  const handleInputErrors = (field) => {
    const errorFound = errors?.find((err) => err.field === field);
    return errorFound ? "is-danger" : "";
  };

  const getErrorMessage = (field) => {
    const error = errors?.find((err) => err.field === field);
    return error ? error.message : "";
  };

  return (
    <div className="register-page container">
      <h1 className="title is-1">Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("firstName")}`}
              type="text"
              placeholder="John"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessage("firstName")}</p>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("lastName")}`}
              type="text"
              placeholder="Doe"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessage("lastName")}</p>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("username")}`}
              type="text"
              placeholder="johnDoe01"
              name="username"
              value={formData.username || ""}
              onChange={handleFormData}
            />
            {getErrorMessage("username") && (
              <p className="help is-danger">{getErrorMessage("username")}</p>
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
              value={formData.email || ""}
              onChange={handleFormData}
            />
            {getErrorMessage("email") && (
              <p className="help is-danger">{getErrorMessage("email")}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("password")}`}
              type="password"
              placeholder="Password"
              name="password"
              minLength="5"
              value={formData.password || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessage("password")}</p>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className={`input ${isPasswordsValid ? "" : "is-danger"}`}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              minLength="5"
              value={formData.confirmPassword || ""}
              onChange={handleFormData}
            />
            {!isPasswordsValid && (
              <p className="help is-danger">Passwords do not match</p>
            )}
          </div>
        </div>

        <div className="field">
          <label className="label">Tenure</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("tenure")}`}
              type="number"
              placeholder="10"
              name="tenure"
              value={formData.tenure || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessage("tenure")}</p>
        </div>

        <div className="field">
          <label className="label">Ecode</label>
          <div className="control">
            <input
              className={`input ${handleInputErrors("eCode")}`}
              type="text"
              placeholder="E010J"
              name="eCode"
              value={formData.eCode || ""}
              onChange={handleFormData}
            />
            {getErrorMessage("eCode") && (
              <p className="help is-danger">{getErrorMessage("eCode")}</p>
            )}
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
                <option value="Full Time">Sales</option>
                <option value="Part Time">Software</option>
                <option value="Part Time">Management</option>
                <option value="Part Time">Operations</option>
                <option value="Part Time">Administration</option>
                <option value="Part Time">Other</option>
              </select>
            </div>
          </div>
          <p className="help is-danger">{getErrorMessage("isFullTime")}</p>
        </div>

        <div className="field">
          <label className="label">Employee Time</label>
          <div className="control">
            <div className="select">
              <select
                name="isFullTime"
                value={formData.isFullTime ? "Full Time" : "Part Time"}
                onChange={handleFormData}
              >
                <option value="">Select dropdown</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>
          <p className="help is-danger">{getErrorMessage("isFullTime")}</p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Register
            </button>
          </div>

          <div className="control">
            <Link to={"/login"}>
              <button className="button is-ghost">Login</button>
            </Link>
          </div>
        </div>

        {errors.find((err) => err.field === "general") && (
          <p className="help is-danger">
            {errors.find((err) => err.field === "general").message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
