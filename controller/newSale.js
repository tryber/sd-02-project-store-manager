const { sales } = require('../services');

const newSale = async (req, res, next) => {
  const { error, ops } = await sales.validProduct(req.body);
  if (error) return next(error);
  return res.status(200).json({ ...ops });
};

module.exports = newSale;
