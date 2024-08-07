import { toast } from "react-toastify";

// Validating confirm password and password values match before submitting form
const usePasswordValidation = () => {
  const validatePasswords = (formData) => {
    if (!formData.password || !formData.confirmPassword) {
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        toastId: "password-mismatch",
      });
      return false;
    }
    return true;
  };

  return { validatePasswords };
};

export default usePasswordValidation;
