import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

const useFetchLoginuser = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return false;
      }

      const { _id, firstName } = data.user;
      dispatch({
        type: "LOGIN",
        payload: { _id, firstName },
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
