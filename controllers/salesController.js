const rescue = require('express-rescue');
const { MongoError, SalesNotFound } = require('../middleware/errorObjects');
const models = require('../models');
const { salesValidation } = require('../services/joiValidation');

const create = rescue(async (req, res) => {
  const { body } = req;

  const validation = () => body.map(async ({ quantity }) =>
    salesValidation.validateAsync({ quantity }))
    .catch((err) => {
      throw new MongoError(err.message);
    });

  await Promise.all(validation())
    .then(async () => {
      const products = await models.salesModel.create(body);

      if (products.insertedCount === 1) return res.status(201).send({ ...body });
    })
    .catch((err) => {
      throw new MongoError(err.message);
    });
});

const get = rescue(async (req, res) => {
  const { params: { id } } = req;
  const sales = await models.salesModel.get(id)
    .catch((err) => {
      throw new MongoError(err.message);
    });

  if (!sales) throw new SalesNotFound(id);
  if (sales.length === 0) throw new SalesNotFound();

  res.status(200).send({ ...sales });
});

const remove = rescue(async (req, res) => {
  const { params: { id } } = req;
  const product = await models.productModel.remove(id)
    .catch((err) => {
      throw new MongoError(err.message);
    });
  if (product.deletedCount === 0) throw new SalesNotFound(id);

  res.status(200).send({ message: `Produto ${id} removido com sucesso.` });
});

module.exports = {
  create,
  get,
  remove,
};
