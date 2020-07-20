const objError = {
  not_found: 404,
  already_exists: 409,
  exists_with_another_id: 409,
  invalid_data: 422,
};

const errorController = async (err, _req, res, _next) => {
  const statusCode = objError[err.code] || 500;
  return res.status(statusCode).json({
    error: { error: true, message: err.message, code: err.code || 'internal_error' },
  });
};

module.exports = {
  errorController,
};
