const messageError = {
  401: "Not authorized",
  404: "Not found",
};

const HttpError = (status, message = messageError[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
