import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoginUser from "../hooks/auth/useLoginUser";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginUser();
  const { setIsUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isLoginSuccess = await loginUser(username, password);

      if (isLoginSuccess) {
        setIsUserLoggedIn(true);
        setUsername("");
        setPassword("");
        navigate("/");
      }
    } catch (err) {
      console.log("Error while logging in", err.message);
    }
  };

  console.log("LoginPage component rendered");

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
