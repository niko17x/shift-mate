import { Outlet } from "react-router-dom";
import Navbar from "../src/components/nav/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
