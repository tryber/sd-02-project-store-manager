const { sales } = require('../services');

const updateOneSale = async (req, res, next) => {
  const { error } = await sales.updateAndValidSale({ ...req.body, ...req.params });
  if (error) return next(error);
  return res.status(200).json({ ok: true });
};

module.exports = updateOneSale;
