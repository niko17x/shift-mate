import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

// todo => add "standard" loading and error state to handle data fetching.

const useLoginUser = () => {
  const { dispatch } = useAuthContext();

  const loginUser = async (username, password) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // update the auth context
        const { _id, username } = data.user;
        dispatch({ type: "LOGIN", payload: { _id, username } });

        toast.success("Logged in successfully!", {
          toastId: "login-user-success",
        });
        return true;
      } else {
        toast.error("Invalid credentials", {
          toastId: "login-user-fail",
        });
        return false;
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while logging in", {
        toastId: "login-user-error",
      });
      return false;
    }
  };
  return { loginUser };
};

export default useLoginUser;
