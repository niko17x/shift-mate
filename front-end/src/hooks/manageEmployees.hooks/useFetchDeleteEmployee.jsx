import { useState } from "react";

const useFetchDeleteEmployee = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEmployee = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/employee/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to delete employee");
      }

      const result = await response.json();
      setIsLoading(false);
      setData(result);
      return true;
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, deleteEmployee };
};

export default useFetchDeleteEmployee;
