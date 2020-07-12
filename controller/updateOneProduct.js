const { product } = require('../services');

const updateOneProduct = async (req, res, next) => {
  const { error } = await product.updateAndValidProduct({ ...req.body, ...req.params });
  if (error) return next(error);
  return res.status(200).json({ ok: true });
};

module.exports = updateOneProduct;
