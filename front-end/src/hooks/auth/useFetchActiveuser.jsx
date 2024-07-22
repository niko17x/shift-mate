import { useEffect, useState } from "react";

const useFetchActiveUser = () => {
  const [activeUserData, setActiveUserData] = useState(null);

  const fetchActiveUser = async () => {
    try {
      const response = await fetch("/api/user/active-user-data", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        setActiveUserData(null);
      } else if (response.ok) {
        const data = await response.json();
        setActiveUserData(data);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActiveUser();
  }, []);

  return { activeUserData, fetchActiveUser };
};

export default useFetchActiveUser;
