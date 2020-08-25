const Joi = require('joi');

const product = Joi.object({
  name: Joi
    .string()
    .min(5)
    .required(),

  quantity: Joi
    .number()
    .integer()
    .min(1)
    .required(),
});

const sales = Joi.object({
  productId: Joi
    .number()
    .integer()
    .min(1)
    .required(),

  quantity: Joi
    .number()
    .integer()
    .min(1)
    .required(),
});

module.exports = {
  product,
  sales,
};
