import { useState } from "react";

const useFetchCreateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const createEmployee = async (formData) => {
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch("api/employee/create-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setErrors(data.errors || ["An error has occurred."]);
        return { success: false, error: data.message };
      }

      setIsLoading(false);
      setErrors([]);
      return { success: true, data };
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        "An unexpected event has occurred. Please try again.";
      setErrors([errorMessage]);
      return { success: false, errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createEmployee, errors };
};

export default useFetchCreateEmployee;
