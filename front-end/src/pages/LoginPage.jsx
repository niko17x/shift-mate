import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchLoginUser from "../hooks/auth/useFetchLoginUser";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, error } = useFetchLoginUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields", {
        toastId: "login-empty-fields",
      });
      return;
    }

    const isLoggedIn = await loginUser(username, password);

    if (isLoggedIn) {
      toast.success("Logged in successfully", {
        toastId: "login-success",
      });
      navigate("/");
    } else if (error) {
      toast.error(error, {
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
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="johnDoe01"
              name="username"
              // required={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
