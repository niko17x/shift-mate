import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useFetchLogout = () => {
  const navigate = useNavigate();

  const logout = async (refetchActiveUser) => {
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
        toast.success("Logged out successfully", {
          toastId: "user-logout-success",
        });
        refetchActiveUser();
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return { logout };
};

export default useFetchLogout;
