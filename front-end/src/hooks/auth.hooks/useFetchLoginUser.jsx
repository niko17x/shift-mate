import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

const useFetchLoginuser = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (username, password) => {
    setIsLoading(true);
    setError(null);

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

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        console.log(data.message);
        return false;
      }

      dispatch({
        type: "LOGIN",
        payload: { _id: data.user._id, username: data.user.username },
      });
      return true;
    } catch (err) {
      console.log(err);
      setError(err.message || "An unexpected error occurred.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, error, isLoading };
};

export default useFetchLoginuser;
