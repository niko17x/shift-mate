import { useState } from "react";
import { toast } from "react-toastify";
import useFetchRegisterUser from "../hooks/auth/useFetchRegisterUser";
import usePasswordValidation from "../hooks/auth/usePasswordValidation";
import { Link, useNavigate } from "react-router-dom";
import handleRegisterInputErrors from "../utils/handleRegisterInputErrors";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
    isFullTime: "",
    tenure: "",
    eCode: "",
  });

  const [passwordMatchValid, setPasswordMatchValid] = useState(true);
  const [confirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const { registerUser, errors } = useFetchRegisterUser();
  const { validatePasswords } = usePasswordValidation(formData);
  const { getInputClass, getErrorMessageText } =
    handleRegisterInputErrors(errors);

  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isConfirmPasswordEmpty, isPasswordsMatch } =
      validatePasswords(formData);

    setIsConfirmPasswordValid(!isConfirmPasswordEmpty);
    setPasswordMatchValid(isPasswordsMatch);

    const isRegisterSuccess = await registerUser(formData);

    console.log(formData);

    if (isRegisterSuccess) {
      toast.success("Registration successful", {
        toastId: "register-user-success",
      });
      navigate("/");
    } else {
      toast.error("Please complete all fields", {
        toastId: "register-user-fail",
      });
    }
  };

  return (
    <div className="register-page container box">
      <h1 className="title is-1">Register</h1>

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
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${getInputClass("password")} ${
                !passwordMatchValid ? "is-danger" : ""
              }`}
              type="password"
              placeholder="Password"
              name="password"
              minLength="5"
              value={formData.password || ""}
              onChange={handleFormData}
            />
            <p className="help is-danger">{getErrorMessageText("password")}</p>
            <p className="help is-danger">{`${
              !passwordMatchValid ? "Passwords do not match" : ""
            }`}</p>
          </div>
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className={`input ${
                !confirmPasswordValid || !passwordMatchValid ? "is-danger" : ""
              }`}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              minLength="5"
              value={formData.confirmPassword || ""}
              onChange={handleFormData}
            />
            <p className="help is-danger">{`${
              !confirmPasswordValid ? "Confirm password is required" : ""
            }`}</p>
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
              Register
            </button>
          </div>

          <div className="control">
            <Link to={"/login"}>
              <button className="button is-ghost">Login</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

// TODO => isFullTime is showing UI warning when empty but toast error is not being displayed.
