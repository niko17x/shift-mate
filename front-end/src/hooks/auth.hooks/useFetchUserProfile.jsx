import { useState, useEffect } from "react";

const useFetchUserProfile = (userId) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          setIsLoading(false);
          setError(data);
          throw new Error(data.message);
        }
        setProfileData(data.user);
        setIsLoading(false);
      } catch (err) {
        setError({ message: err.message });
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return { profileData, isLoading, error };
};

export default useFetchUserProfile;
