import { useState } from "react";

const useFetchUpdateUserProfile = () => {
  const [updatedProfileData, setUpdatedProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserProfile = async (userId, profileDataForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileDataForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        setIsLoading(false);
        throw new Error(data.message);
      }

      setUpdatedProfileData(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      setError({ message: err.message });
      setIsLoading(false);
      throw err;
    }
  };

  return { updateUserProfile, updatedProfileData, error, isLoading };
};

export default useFetchUpdateUserProfile;
