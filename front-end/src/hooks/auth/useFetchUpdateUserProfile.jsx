import { useState } from "react";
import { toast } from "react-toastify";

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
        toast.error(`${data.message}`, {
          toastId: "profile-update-fail",
        });
        setError(data);
        setIsLoading(false);
        return;
      }

      setUpdatedProfileData(data);
      toast.success("Successfully updated profile", {
        toastId: "profile-update-success",
      });
    } catch (err) {
      console.log("Error:", err.message);
      setError({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUserProfile, updatedProfileData, error, isLoading };
};

export default useFetchUpdateUserProfile;
