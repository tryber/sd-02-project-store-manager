const express = require('express');
const rescue = require('express-rescue');
const productService = require('../services/productService');
const { notFound, badData } = require('../middlewares/error');

const router = express.Router();

// instalar express rescue

router.get('/', rescue(async (_req, res) => {
  const products = await productService.listProduct();
  return res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const singleProduct = await productService.showOneProduct(id);
  if (singleProduct === null) { throw notFound; }
  return res.status(200).json(singleProduct);
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productService.deleteProduct(id);
  if (deleteProduct === null) { throw notFound; }
  return res.status(204).json();
}));

router.put('/:id', rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  if (typeof name !== 'string' || name.length <= 5 || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
    throw badData;
  }
  await productService.updateProduct(name, quantity, id);
  return res.status(204).json();
}));

router.post('/', rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  if (typeof name !== 'string' || name.length <= 5 || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
    throw badData;
  }
  const newProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(newProduct);
}));

module.exports = router;
