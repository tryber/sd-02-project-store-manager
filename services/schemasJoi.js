const Joi = require('@hapi/joi');

const product = Joi.object({
  name: Joi
    .string()
    .min(5)
    .alphanum()
    .required(),
  quantity: Joi
    .number()
    .integer()
    .min(1)
    .required(),
});

const sales = Joi.array().items({
  productId: Joi
    .string()
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
