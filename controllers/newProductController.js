const productModel = require('../models/productModel');
const validateNewProduct = require('../middlewares/validate');

const newProduct = async (req, res, next) => {
  const isValid = await validateNewProduct.validate(req.body);
  const existProduct = await productModel.findByName(req.body);
  if (isValid.error) return next(isValid);
  if (existProduct.length > 0) {
    return next({ error: { message: 'Item already exists', code: 409 } });
  }
  await productModel.createProduct(req.body);
  return res.status(201).end();
};

module.exports = {
  newProduct,
};
