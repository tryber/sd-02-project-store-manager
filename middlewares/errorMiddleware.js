function errorBoom(err, res) {
  const {
    output: {
      payload: { statusCode, message },
    },
    data,
  } = err;

  const response = res.status(statusCode);

  if (data) {
    return response.json({ error: { message, erros: data } });
  }

  return response.json({ error: { message } });
}

function errorMiddleware(err, _req, res, _next) {
  if (err.isBoom) {
    return errorBoom(err, res);
  }

  return res.status(500).json({ error: { message: err.message } });
}

module.exports = errorMiddleware;
