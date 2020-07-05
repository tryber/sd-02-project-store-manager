const errorController = async (err, req, res, _next) => {
  console.log(err);
  return res.status(404)
    .json({
      err,
    });
};

module.exports = {
  errorController,
};
