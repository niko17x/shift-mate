import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetchRegisterUser = () => {
  const [errors, setErrors] = useState([]);
  const { dispatch } = useAuthContext();

  const registerUser = async (formData) => {
    setErrors([]);

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || ["Registration failed. Fetch request error"]);
        return false;
      }

      const { _id, username } = data.user;
      dispatch({ type: "LOGIN", payload: { _id, username } });

      return true;
    } catch (error) {
      setErrors(["Registration fetch request has failed"]);
      return false;
    }
  };

  return { registerUser, errors };
};

export default useFetchRegisterUser;

// ! Read about throw new error vs returning false on chatgpt =>
