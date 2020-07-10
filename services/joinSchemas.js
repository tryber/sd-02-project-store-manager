const Joi = require('@hapi/joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().prefs({ convert: false }).integer().min(0).required(),
}).unknown(false);

const salesSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().prefs({ convert: false }).integer().min(0).required(),
}).unknown(false);

module.exports = {
  productsSchema,
  salesSchema,
};
