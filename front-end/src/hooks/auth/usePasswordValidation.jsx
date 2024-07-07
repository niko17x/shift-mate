import { useState } from "react";
import { toast } from "react-toastify";

// Validating confirm password and password values match before submitting form
const usePasswordValidation = (formData) => {
  const [isPasswordsValid, setIsPasswordsValid] = useState(true);

  const validatePasswords = () => {
    console.log(formData);
    if (formData.password !== formData.confirmPassword) {
      setIsPasswordsValid(false);
      toast.error("Passwords do not match", {
        toastId: "password-mismatch",
      });
      return false;
    }
    setIsPasswordsValid(true);
    return true;
  };

  return { validatePasswords, isPasswordsValid };
};

export default usePasswordValidation;
