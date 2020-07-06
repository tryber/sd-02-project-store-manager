const errorController = async (err, req, res, _next) => {
  const statusCode = err.code === 'invalid_data' ? 422 : 404;
  return res.status(statusCode)
    .json({
      err,
    });
};

module.exports = {
  errorController,
};
