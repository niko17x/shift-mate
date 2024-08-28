import { useState, useCallback } from "react";

const useFetchAllEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllEmployees = useCallback(async (sortBy, order) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/employee/all-employees?sortBy=${sortBy}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "There was an issue with the server");
      }

      setData(result);
      return result;
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching all employees"
      );
      return null; // Ensuring consistent return value in case of error
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, fetchAllEmployees, data, error };
};

export default useFetchAllEmployees;

// The !response.ok is what triggers the 'catch' block. The error is then handled within the catch block - so setting the setERror inside the catch block is important not inside the !response.ok block.
