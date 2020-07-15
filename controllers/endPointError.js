const endPointError = async (req, res, next) => {
  return res.status(404).json({ error: { message: 'Endpoint not found', code: 404 } });
};

module.exports = {
  endPointError,
};
