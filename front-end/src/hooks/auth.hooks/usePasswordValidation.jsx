// Validating confirm password and password values match before submitting form
const usePasswordValidation = () => {
  const validatePasswords = ({ password, confirmPassword }) => {
    if (!confirmPassword) {
      return { isConfirmPasswordEmpty: true, isPasswordsMatch: false };
    }

    return {
      isPasswordsMatch: password === confirmPassword,
      isConfirmPasswordEmpty: false,
    };
  };

  return { validatePasswords };
};

export default usePasswordValidation;
