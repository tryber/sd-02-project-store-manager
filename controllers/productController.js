const Product = require('../models/Product');
const rescue = require('express-rescue');
const schemaJoi = require('../services/schemasJoi');
const validator = require('../services/validator');
const JoiError = require('../services/JoiError');

const listProducts = rescue(async (_req, res) => {
  const products = await new Product().getAll();
  return res.status(200).json(products);
});

const insertProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = new Product(name, quantity);
  try {
    await validator.product.hasName(name);
    await schemaJoi.product.validateAsync({ name, quantity });
  } catch (err) {
    return res.status(400).json(JoiError(err));
  }

  const result = await newProduct.add();

  return res.status(201).json(result.ops[0]);
});

const productById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await new Product().getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  return res.status(200).json(product);
});

const productDeleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await new Product().deleteById(id);

  return res.status(200).json({ message: 'Produto deletado com sucesso!' });
});

const productUpdateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const newProduct = new Product(name, quantity);

  try {
    await schemaJoi.product.validateAsync({ name, quantity });
  } catch (err) {
    return res.status(400).json(JoiError(err));
  }

  const response = await newProduct.updateById(id);

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
