const errorController = async (err, req, res, _next) => {
  res.status(err.error.code).json(err);
};

module.exports = errorController;
