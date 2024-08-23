import { useState } from "react";

const useFetchCreateEmployee = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createEmployee = async (formData) => {
    setErrors([]);
    setIsLoading(true);

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
        setErrors(data.errors || ["An error has occurred"]);
        return { success: false, error: data.message };
      }

      setErrors([]);
      return { success: true, data };
    } catch (error) {
      const errorMessage = "There was an issue with the server request";
      setErrors([errorMessage]);
      return { success: false, errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { createEmployee, errors, isLoading };
};

export default useFetchCreateEmployee;

// * Setting errors in the !response.ok block means your setting errors that are related to a successfull http request but an unsuccessfull HTTP response (aka: 400, 404 status codes).

// * the 'catch' block is invoked specifically when there is a server error or the fetch operation to the API itself (also, network issues, timeouts, etc...). Setting error state in the catch block is specifically related to these network related issues.
