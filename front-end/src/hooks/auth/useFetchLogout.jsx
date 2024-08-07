import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const useFetchLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Failed to log out", {
          toastId: "user-logout-fail",
        });
      } else {
        dispatch({ type: "LOGOUT" });
        toast.success("Logged out successfully", {
          toastId: "user-logout-success",
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return { logout };
};

export default useFetchLogout;
