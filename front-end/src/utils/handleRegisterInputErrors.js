// Utility functions for form error handling

const handleRegisterInputErrors = (errors) => {
  const errorClasses = {};
  const errorMessages = {};

  errors.forEach((err) => {
    errorClasses[err.path] = "is-danger";
    errorMessages[err.path] = err.msg;
  });

  const getInputClass = (field) => errorClasses[field] || "";
  const getErrorMessageText = (field) => errorMessages[field] || "";

  // console.log("handleInputErrors function invoked");

  return { getInputClass, getErrorMessageText };
};

export default handleRegisterInputErrors;
