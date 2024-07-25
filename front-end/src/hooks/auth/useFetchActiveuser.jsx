import { useEffect, useState, useCallback, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const useFetchActiveUser = () => {
  const [activeUserData, setActiveUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsUserLoggedIn } = useContext(UserContext);

  const fetchActiveUser = useCallback(async () => {
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
        setIsUserLoggedIn(data.isLoggedIn);
      } else {
        setActiveUserData(null);
        setIsUserLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
      setActiveUserData(null);
      setIsUserLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, [setIsUserLoggedIn]);

  useEffect(() => {
    fetchActiveUser();
  }, [fetchActiveUser]);

  return { activeUserData, fetchActiveUser, isLoading };
};

export default useFetchActiveUser;
