const { sales } = require('../services');

const deleteSale = async (req, res, next) => {
  const { error } = await sales.deleteFromId(req.params);
  if (error) return next({ message: error.message, code: 'internal_error' });
  return res.status(200).json({ ok: true });
};

module.exports = deleteSale;
