const { product } = require('../services');

const deleteOneProduct = async (req, res, next) => {
  const { error } = await product.deleteFromId(req.params);
  if (error) return next({ message: error.message, code: 'internal_error' });
  return res.status(200).json({ ok: true });
};

module.exports = deleteOneProduct;
