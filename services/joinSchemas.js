const Joi = require('@hapi/joi');

const quantity = Joi
  .number()
  .prefs({ convert: false })
  .integer()
  .min(0)
  .required();

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity,
}).unknown(false);

const salesSchema = Joi.object({
  productId: Joi.string().required(),
  quantity,
}).unknown(false);

module.exports = {
  productsSchema,
  salesSchema,
};
