const { sales } = require('../services');

const listOneSale = async (req, res, next) => {
  const { products, error } = await sales.validateId(req.params);
  if (error) return next({ message: error.message, code: 'internal_error' });
  if (!products) return next({ message: 'Page not found', code: 'not_found' });
  return res.status(200).json({ products });
};

module.exports = listOneSale;
