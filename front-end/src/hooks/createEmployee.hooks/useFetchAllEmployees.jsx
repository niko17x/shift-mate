import { useEffect, useState } from "react";

const useFetchAllEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const fetchAllEmployees = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("api/employee/all-employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("There was an issue with the server");
      }

      setIsLoading(false);
      setEmployees(data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return { isLoading, fetchAllEmployees, employees };
};

export default useFetchAllEmployees;
