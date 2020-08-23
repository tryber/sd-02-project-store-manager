const rescue = require('express-rescue');
const error = require('../middleware/errorObjects');
const models = require('../models');
const { productValidation } = require('../services/joiValidation');

const get = rescue(async (req, res) => {
  const { params: { id } } = req;
  const products = await models.productModel.get(id);

  if (!products) throw new error.ProductNotFound(id);
  if (products.length === 0) throw new error.ProductNotFound();

  res.status(200).send({ ...products });
});

const add = rescue(async (req, res) => {
  const { body: { name, quantity } } = req;
  await productValidation.validateAsync({ name, quantity });

  const products = await models.productModel.add({ name, quantity });

  if (products) return res.status(201).send({ name, quantity });
  throw new Error();
});

const remove = rescue(async (req, res) => {
  const { params: { id } } = req;
  const product = await models.productModel.remove(id);
  if (product.deletedCount === 0) throw new error.ProductNotFound(id);

  res.status(200).send({ message: `Produto ${id} removido com sucesso.` });
});

const update = rescue(async (req, res) => {
  const { params: { id }, body: { name, quantity } } = req;
  await productValidation.validateAsync({ name, quantity });

  const products = await models.productModel.update({ id, name, quantity });

  if (products.matchedCount === 0) throw new error.ProductNotFound(id);

  return res.status(200).send({ name, quantity });
});

module.exports = {
  get,
  add,
  remove,
  update,
};
