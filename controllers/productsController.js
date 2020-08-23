const rescue = require('express-rescue');
const error = require('../middleware/errorObjects');
const models = require('../models');
const schema = require('../services/joiValidation');

const getProducts = rescue(async (req, res) => {
  const { params: { id } } = req;
  const products = await models.productModel.getProducts(id);

  if (!products) throw new error.ProductNotFound(id);
  if (products.length === 0) throw new error.ProductNotFound();

  res.status(200).send({ ...products });
});

const addProduct = rescue(async (req, res) => {
  const { body: { name, quantity } } = req;
  await schema.validateAsync({ name, quantity });

  const products = await models.productModel.addProduct({ name, quantity });

  if (products) return res.status(200).send({ name, quantity });
  throw new Error();
});

const removeProduct = rescue(async (req, res) => {
  const { params: { id } } = req;
  const product = await models.productModel.removeProduct(id);
  if (product.deletedCount === 0) throw new error.ProductNotFound(id);

  res.status(200).send({ message: `Produto ${id} removido com sucesso.` });
});

module.exports = {
  getProducts,
  addProduct,
  removeProduct,
};
