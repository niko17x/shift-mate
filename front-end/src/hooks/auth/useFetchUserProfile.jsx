import { useState, useEffect } from "react";

const useFetchUserProfile = (userId) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data.user);
        } else {
          setError("Failed to fetch user profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  return { profileData, isLoading, error };
};

export default useFetchUserProfile;
