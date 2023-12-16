export const errorHandler = (statusCode, message) => {
  const error = new Error();

  error.statusCode = statusCode;
  error.message = message;

  return error;
};

export const errorValdationHandler = (error) => {
  const errors = error.details.map((err) => err.message);

  return errors;
};
