import { useState } from "react";

const useFetchEmployeeProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const employeeProfile = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`api/employee/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "HTTP error occurred while fetching employee profile"
        );
      }

      setData(result);
      return result;
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching employee profile"
      );
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { employeeProfile, isLoading, error, data };
};

export default useFetchEmployeeProfile;
