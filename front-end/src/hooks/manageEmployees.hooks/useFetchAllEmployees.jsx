import { useState } from "react";

const useFetchAllEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllEmployees = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("api/employee/all-employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("There was an issue with the server");
      }

      setData(data);
      return data || [];
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching all employees"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchAllEmployees, data, error };
};

export default useFetchAllEmployees;

// The !response.ok is what triggers the 'catch' block. The error is then handled within the catch block - so setting the setERror inside the catch block is important not inside the !response.ok block.
