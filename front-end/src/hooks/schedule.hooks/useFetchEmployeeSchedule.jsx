import { useState } from "react";

const useFetchEmployeeSchedule = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEmployeeSchedule = async (employeeId, year, weekNum) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        employeeId,
        year,
        weekNum,
      }).toString();
      const response = await fetch(
        `/api/schedule/scheduled-employees?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setError(result.error || "Failed to retrieve employee schedule");
        return {
          success: false,
          error: result.error || "Server request failed",
        };
      }

      setData(result);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: "Error with server" };
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchEmployeeSchedule };
};

export default useFetchEmployeeSchedule;

/**
 * For HTTP GET requests, since "body" does not comply, you can use "new URLSearchParams" to pass data in URL to server.
 */
