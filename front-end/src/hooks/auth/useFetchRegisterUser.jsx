import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const useFetchRegisterUser = () => {
  const [errors, setErrors] = useState([]);
  const { dispatch } = useAuthContext();

  const registerUser = async (formData) => {
    try {
      setErrors([]);
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // console.log(formData);

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || []);

        return false;
      } else {
        toast.success("Registration successful!", {
          toastId: "response-success",
        });
        dispatch({ type: "LOGIN" });
        return true;
      }
    } catch (error) {
      console.log(`Failed to register user: ${error.message}`);
      return false;
    }
  };

  return { registerUser, errors };
};

export default useFetchRegisterUser;
