import { useState } from "react";

const useFetchCreateEmployee = () => {
  const [errors, setErrors] = useState([]);

  const createEmployee = async (formData) => {
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
        setErrors(data.errors || ["An error has occurred."]);
        return { success: false, error: data.message };
      }

      setErrors([]);
      return { success: true, data };
    } catch (error) {
      const errorMessage =
        "An unexpected event has occurred. Please try again.";
      setErrors([errorMessage]);
      return { success: false, errorMessage };
    }
  };

  return { createEmployee, errors };
};

export default useFetchCreateEmployee;
