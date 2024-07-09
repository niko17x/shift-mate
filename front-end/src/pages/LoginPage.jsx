import { useState } from "react";
import { Link } from "react-router-dom";
import useLoginUser from "../hooks/auth/useLoginUser";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginUser(username, password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser();

      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("Error while logging in", err.message);
    }
  };

  return (
    <div className="login-page container">
      <h1 className="title is-1">Login</h1>

      <form action="" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="johnDoe01"
              name="username"
              required={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
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
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Login
            </button>
          </div>
          <div className="control">
            <Link to={"/register"}>
              <button className="button is-link is-ghost">Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

// TODO: CREATE A MODAL AFTER CLICKING 'CANCEL' BUTTON

export default LoginPage;
