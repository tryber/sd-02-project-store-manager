const { product } = require('../services');

const listOneProduct = async (req, res, next) => {
  const { products, error } = await product.validateId(req.params);
  if (error) return next({ message: error.message, code: 'internal_error' });
  if (!products) return next({ message: 'Page not found', code: 'not_found' });
  return res.status(200).json({ products });
};

module.exports = listOneProduct;
