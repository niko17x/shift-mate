import { useState } from "react";

const useFetchUpdateUserProfile = () => {
  const [updatedProfileData, setUpdatedProfileData] = useState(null);
  const [error, setError] = useState(null);

  const updateUserProfile = async (userId, profileDataForm) => {
    // console.log("profileDataForm :", profileDataForm.isFullTime);
    console.log(profileDataForm);

    try {
      const response = await fetch(`/api/user/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileDataForm),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("data:", JSON.stringify(data, null, 2));
        setUpdatedProfileData(data);
      } else {
        const errorData = await response.json();
        console.log(
          "Failed to update profile:",
          JSON.stringify(errorData, null, 2)
        );
        setError(errorData);
      }
    } catch (err) {
      console.log("Error:", err.message);
      setError({ message: err.message });
    }
  };

  return { updateUserProfile, updatedProfileData, error };
};

export default useFetchUpdateUserProfile;
