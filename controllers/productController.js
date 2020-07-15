const Product = require('../models/Product');
const rescue = require('express-rescue');
const schemaJoi = require('../services/schemasJoi');
const validator = require('../services/validator');

const listProducts = rescue(async (_req, res) => {
  const products = await Product.getAll();
  return res.status(200).json(products);
});

const insertProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = new Product(name, quantity);

  await validator.product.hasName(name);
  await schemaJoi.product.validateAsync({ name, quantity });

  const result = await newProduct.add();

  return res.status(201).json(result.ops[0]);
});

const productById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await Product.getById(id);

  if (!product) {
    return Promise.reject({ error: {
      message: 'Produto não encontrado',
      code: 'not_found' },
    });
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
  const newProduct = new Product(name, quantity);

  await schemaJoi.product.validateAsync({ name, quantity });

  const response = await newProduct.updateById(id);

  if (!response.matchedCount) {
    return Promise.reject({ error: {
      message: 'Produto não encontrado',
      code: 'not_found' },
    });
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
