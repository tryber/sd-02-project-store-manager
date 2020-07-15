const productService = require('../services/productService');
const validateNewProduct = require('../middlewares/validate');

const newProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const isValid = await validateNewProduct.validate({ name, quantity });
  if (isValid.error) return next(isValid);
  const serviceProduct = await productService.newProduct(name, quantity);
  if (serviceProduct.error) return next(serviceProduct);
  return res.status(201).end();
};

const findAllProducts = async (req, res) => {
  const products = await productService.findAll();
  return res.status(200).json(products);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  if (product.error) return next(product);
  return res.json(product);
};

module.exports = {
  newProduct,
  findAllProducts,
  findById,
};
