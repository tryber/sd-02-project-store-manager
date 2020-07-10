const joiError = require('../services/JoiError');

const objError = {
  not_found: 404,
  already_exists: 409,
  invalid_data: 422,
};

const errorController = async (err, _req, res, _next) => {
  const statusCode = objError[joiError(err).error.code] || 500;
  return res.status(statusCode).json(joiError(err));
};

module.exports = errorController;
