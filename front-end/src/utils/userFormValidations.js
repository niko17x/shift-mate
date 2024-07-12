// Utility functions for form error handling
export const handleInputErrors = (errors, field) => {
  const errorFound = Array.isArray(errors)
    ? errors.find((err) => err.field === field)
    : null;
  return errorFound ? "is-danger" : "";
};

export const getErrorMessage = (errors, field) => {
  const error = Array.isArray(errors)
    ? errors.find((err) => err.field === field)
    : null;
  return error ? error.message : "";
};
