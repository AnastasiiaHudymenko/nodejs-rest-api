const HttpError = require("../helpers/HttpError");

const validateBodyOneField = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const match = error.message.match(/"([^"]*)"/);
      next(HttpError(400, `missing required field ${match[1]}`));
    }
    next();
  };

  return func;
};

module.exports = validateBodyOneField;
