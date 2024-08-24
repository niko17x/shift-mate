import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchLoginUser from "../hooks/auth.hooks/useFetchLoginUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useFetchLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        toastId: "login-empty-fields",
      });
      return;
    }

    const isLoggedIn = await loginUser(email, password);

    if (isLoggedIn) {
      toast.success("Logged in successfully", {
        toastId: "login-success",
      });
      navigate("/");
    } else {
      toast.error("Failed to login", {
        toastId: "login-fail",
      });
    }
  };

  // console.log("LoginPage component rendered");

  return (
    <div className="login-page container box">
      <h1 className="title is-1">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="johnDoe01"
              name="username"
              // required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              // required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Login
            </button>
          </div>
          <div className="control">
            <Link to="/register">
              <button className="button is-link is-ghost">Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
