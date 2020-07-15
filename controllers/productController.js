const productService = require('../services/productService');
const validateNewProduct = require('../middlewares/validate');

const newProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const isValid = await validateNewProduct.validate({ name, quantity });
  if (isValid.error) return next(isValid);
  const serviceProduct = await productService.newProduct(name, quantity);
  if (serviceProduct.error) return next(serviceProduct);
  return res.status(201).json(serviceProduct);
};

const findAllProducts = async (req, res, next) => {
  const products = await productService.findAll();
  if (products.error) return next(products);
  return res.status(200).json(products);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (product.error) return next(product);
  return res.status(200).json(product);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.deleteById(id);
  if (product.error) return next(product);
  return res.status(200).end();
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const isValid = await validateNewProduct.validate({ name, quantity });
  if (isValid.error) return next(isValid);
  const product = await productService.updateById(id, name, quantity);
  if (product.error) return next(product);
  return res.status(200).json(product);
};

module.exports = {
  newProduct,
  findAllProducts,
  findById,
  deleteById,
  updateById,
};
