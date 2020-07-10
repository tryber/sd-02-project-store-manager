function errorBoom(err, res) {
  const {
    output: {
      payload: { statusCode, message },
    },
    data,
  } = err;

  const response = res.status(statusCode);

  if (statusCode === 400) {
    if (data) {
      return response.json({ error: { message: 'Dados Inválidos', erros: data, code: message } });
    }
    return response.json({ error: { message } });
  }

  return response.json({ error: { message: data, code: message } });
}

function errorMiddleware(err, _req, res, _next) {
  if (err.isBoom) {
    return errorBoom(err, res);
  }

  return res.status(500).json({ error: { message: err.message, code: 'ServerError' } });
}

module.exports = errorMiddleware;
