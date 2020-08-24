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
      const sales = await models.salesModel.create(body);

      if (sales.insertedCount === 1) return res.status(201).send({ ...body });
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
  const sales = await models.salesModel.remove(id)
    .catch((err) => {
      throw new MongoError(err.message);
    });
  if (sales.deletedCount === 0) throw new SalesNotFound(id);

  res.status(200).send({ message: `Produto ${id} removido com sucesso.` });
});

const update = rescue(async (req, res) => {
  const { params: { id }, body: products } = req;

  const validation = () => products.map(async ({ quantity }) =>
    salesValidation.validateAsync({ quantity })
      .catch((err) => {
        throw new MongoError(err.message);
      }));

  await Promise.all(validation())
    .then(async () => {
      const sales = await models.salesModel.update(id, products);

      if (sales.matchedCount === 0) throw new SalesNotFound(id);

      return res.status(200).send({ id, products });
    })
    .catch((err) => {
      throw new MongoError(err.message);
    });
});

module.exports = {
  create,
  get,
  remove,
  update,
};
