import { useEffect, useState } from "react";

const useFetchActiveUser = () => {
  const [activeUserData, setActiveUserData] = useState(null);

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const response = await fetch("/api/user/active-user-data", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setActiveUserData(data);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchActiveUser();
  }, []);

  return { activeUserData };
};

export default useFetchActiveUser;