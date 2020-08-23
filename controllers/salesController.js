const rescue = require('express-rescue');
const error = require('../middleware/errorObjects');
const models = require('../models');
const { salesValidation } = require('../services/joiValidation');

const create = rescue(async (req, res) => {
  const { body } = req;

  const validation = () => body.map(async ({ quantity }) =>
    salesValidation.validateAsync({ quantity }));

  await Promise.all(validation())
    .then(async () => {
      const products = await models.salesModel.create(body);

      if (products.insertedCount === 1) return res.status(201).send({ ...body });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

module.exports = {
  create,
};
