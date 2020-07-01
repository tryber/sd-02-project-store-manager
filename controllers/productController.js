const Product = require('../models/productModel');
const rescue = require('express-rescue');
const schemaJoi = require('../models/schemasJoi');
const validator = require('../services/validator');

const listProducts = rescue(async (_req, res) => {
  const products = await Product.getAll();
  return res.status(200).json(products);
});

const insertProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  try {
    await validator.product.hasName(name);
    await schemaJoi.product.validateAsync({ name, quantity });
  }
  catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const result = await Product.add({ name, quantity });

  return res.status(201).json(result.ops[0]);
});

const productById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await Product.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  return res.status(200).json(product);
});

const productDeleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await Product.deleteById(id);

  return res.status(200).json({ message: 'Produto deletado com sucesso!' });
});

const productUpdateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    await schemaJoi.product.validateAsync({ name, quantity });
  }
  catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const response = await Product.updateById(id, name, quantity);

  if (!response.matchedCount) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  return res.status(200).json({ message: 'Produto atualizado com sucesso!' });
});

module.exports = {
  listProducts,
  insertProduct,
  productById,
  productDeleteById,
  productUpdateById,
};
