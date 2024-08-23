import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import useFetchLogout from "../../hooks/auth.hooks/useFetchLogout";

const Navbar = () => {
  const { logout } = useFetchLogout();

  let firstName, _id;

  try {
    const isUserLoggedIn = JSON.parse(localStorage.getItem("user") ?? "{}");
    ({ firstName, _id } = isUserLoggedIn);
  } catch (error) {
    console.error("Failed to parse user data:", error);
  }

  // console.log("Navbar component loaded");

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to={"/"}>
            Home
          </Link>

          <Link className="navbar-item">About</Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link">Tools</Link>
            <div className="navbar-dropdown">
              <Link className="navbar-item" to={"/scheduler"}>
                Scheduler
              </Link>
              <Link className="navbar-item" to={"/create-employee"}>
                Manage Employees
              </Link>
            </div>
          </div>
        </div>

        {firstName ? (
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              <Link className="navbar-item">{firstName}</Link>
            </div>
            <div className="navbar-dropdown">
              <Link className="navbar-item" to={`/profile/${_id}`}>
                Profile
              </Link>
              <Link className="navbar-item" onClick={() => logout()}>
                Log out
              </Link>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to={"/register"}>
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light" to={"/login/"}>
                  Log in
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Display needed w/ anonymous func - used in Dev Tools.
Navbar.displayName = "Navbar";

export default Navbar;
