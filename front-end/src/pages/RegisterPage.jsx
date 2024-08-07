import { useState } from "react";
import { toast } from "react-toastify";
import useFetchRegisterUser from "../hooks/auth/useFetchRegisterUser";
import usePasswordValidation from "../hooks/auth/usePasswordValidation";
import { Link } from "react-router-dom";
import handleRegisterInputErrors from "../utils/handleRegisterInputErrors";

// todo => add loading state
// todo => fix confirm password input error handling

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
  const { registerUser, errors } = useFetchRegisterUser();
  const { validatePasswords } = usePasswordValidation(formData);
  const { getInputClass, getErrorMessageText } =
    handleRegisterInputErrors(errors);

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "isFullTime" ? value === "Full Time" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validatePasswords(formData);

    try {
      const { confirmPassword, ...modifiedFormData } = formData;
      modifiedFormData.isFullTime = formData.isFullTime === "full";

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
          <label className="label">Username</label>
          <div className="control">
            <input
              className={`input ${getInputClass("username")}`}
              type="text"
              placeholder="johnDoe01"
              name="username"
              value={formData.username || ""}
              onChange={handleFormData}
            />
            <p className="help is-danger">{getErrorMessageText("username")}</p>
          </div>
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
              className={`input ${getInputClass("password")}`}
              type="password"
              placeholder="Password"
              name="password"
              minLength="5"
              value={formData.password || ""}
              onChange={handleFormData}
            />
          </div>
          <p className="help is-danger">{getErrorMessageText("password")}</p>
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              minLength="5"
              value={formData.confirmPassword || ""}
              onChange={handleFormData}
            />
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
              minLength={5}
              maxLength={5}
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
                <option value="Full Time">Sales</option>
                <option value="Part Time">Software</option>
                <option value="Part Time">Management</option>
                <option value="Part Time">Operations</option>
                <option value="Part Time">Administration</option>
                <option value="Part Time">Other</option>
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
                <option value="full">Full Time</option>
                <option value="part">Part Time</option>
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
