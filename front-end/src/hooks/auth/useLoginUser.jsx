import { toast } from "react-toastify";

const useLoginUser = (username, password) => {
  const loginUser = async () => {
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
        toast.success("Logged in successfully!", {
          toastId: "login-user-success",
        });
      } else {
        toast.error("Failed to log in", {
          toastId: "login-user-fail",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while logging in", {
        toastId: "login-user-error",
      });
    }
  };
  return { loginUser };
};

export default useLoginUser;
