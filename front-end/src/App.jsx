import { Outlet } from "react-router-dom";
import Navbar from "../src/components/nav/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer autoClose={1800} position="top-center" />
    </>
  );
};

export default App;
