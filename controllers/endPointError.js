const endPointError = async (req, res) =>
  res.status(404).json({ error: { message: 'Endpoint not found', code: 404 } });

module.exports = {
  endPointError,
};
