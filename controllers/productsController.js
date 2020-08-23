const rescue = require('express-rescue');
const error = require('../middleware/errorObjects');
const models = require('../models');
const schema = require('../services/joiValidation');

const getProducts = rescue(async (req, res) => {
  const { params: { id } } = req;
  console.log(id);
  const products = await models.productModel.getProducts(id);
  console.log(products);

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

module.exports = {
  getProducts,
  addProduct,
};
