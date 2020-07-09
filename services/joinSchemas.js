const Joi = require('@hapi/joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().integer().min(1),
}).and('name', 'quantity');

module.exports = {
  productsSchema,
};
