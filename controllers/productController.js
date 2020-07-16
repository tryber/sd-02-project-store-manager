const rescue = require('express-rescue');
const productService = require('../services/productService');
const validateNewProduct = require('../middlewares/validate');

const newProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const isValid = await validateNewProduct.validate({ name, quantity });
  if (isValid.error) return next(isValid);
  const serviceProduct = await productService.newProduct(name, quantity);
  return res.status(201).json(serviceProduct);
});

const findAllProducts = rescue(async (req, res, next) => {
  const products = await productService.findAll();
  if (products.error) return next(products);
  return res.status(200).json(products);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (product.error) return next(product);
  return res.status(200).json(product);
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await productService.deleteById(id);
  return res.status(204).end();
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const isValid = await validateNewProduct.validate({ name, quantity });
  if (isValid.error) return next(isValid);
  const product = await productService.updateById(id, name, quantity);
  if (product.error) return next(product);
  return res.status(200).json(product);
});

module.exports = {
  newProduct,
  findAllProducts,
  findById,
  deleteById,
  updateById,
};
