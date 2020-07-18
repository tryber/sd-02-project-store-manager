const rescue = require('express-rescue');
const productService = require('../services/productService');
const validateNewProduct = require('../middlewares/validate');

const newProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  await validateNewProduct.validate({ name, quantity });
  const serviceProduct = await productService.newProduct(name, quantity);
  return res.status(201).json(serviceProduct);
});

const findAllProducts = rescue(async (req, res) => {
  const products = await productService.findAll();
  return res.status(200).json(products);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  return res.status(200).json(product);
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await productService.deleteById(id);
  return res.status(204).end();
});

const updateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await validateNewProduct.validate({ name, quantity });
  const product = await productService.updateById(id, name, quantity);
  return res.status(200).json(product);
});

module.exports = {
  newProduct,
  findAllProducts,
  findById,
  deleteById,
  updateById,
};
