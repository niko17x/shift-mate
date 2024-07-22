import { toast } from "react-toastify";

const useLoginUser = () => {
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
        toast.success("Logged in successfully!", {
          toastId: "login-user-success",
        });
        return true;
      } else {
        const errorData = await response.json();
        console.log(`Failed to login user: ${errorData.message}`);
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
