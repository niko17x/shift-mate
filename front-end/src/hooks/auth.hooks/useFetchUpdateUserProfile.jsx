import { useState } from "react";

const useFetchUpdateUserProfile = () => {
  const [updatedProfileData, setUpdatedProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfile = async (userId, profileDataForm) => {
    setIsLoading(true);

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
        const errorMessage =
          data.message || "An unexpected error has occurred.";
        return { success: false, error: errorMessage };
      }

      setUpdatedProfileData(data);
      return { success: true, data };
    } catch (err) {
      const fallbackError =
        "An unexpected error has occurred. Please try again.";
      return { success: false, error: fallbackError };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUserProfile, updatedProfileData, isLoading };
};

export default useFetchUpdateUserProfile;
