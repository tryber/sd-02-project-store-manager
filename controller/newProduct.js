const { product } = require('../services');

const newProduct = async (req, res, next) => {
  const { error, register } = await product.validProduct(req.body);
  if (error) return next(error);
  return res.status(200).json({ ...register });
};

module.exports = newProduct;
