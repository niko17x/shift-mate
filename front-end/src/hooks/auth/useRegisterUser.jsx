import { useState } from "react";
import { toast } from "react-toastify";

const useRegisterUser = () => {
  const [errors, setErrors] = useState(null);

  const registerUser = async (formData) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // setErrors({ [errorData.field.field]: errorData.message });
        setErrors(errorData.errors);
      } else {
        toast.success("Registration successful!", {
          toastId: "response-success",
        });
      }
    } catch (error) {
      console.log(`Failed to register user: ${error.message}`);
    }
  };

  return { registerUser, errors };
};

export default useRegisterUser;
