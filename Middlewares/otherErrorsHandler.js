const otherErrorsHandler = (err, _req, res, _next) => (
  res.status(500).json({ message: err.message || 'Erro interno' })
);

module.exports = otherErrorsHandler;
