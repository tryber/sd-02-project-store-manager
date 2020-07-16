const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaNewProduct = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .strict(),
});

const schemaNewSale = Joi.object({
  produtId: Joi.objectId().max(100).required(),
  quantity: Joi.number()
  .integer()
  .min(1)
  .required()
  .strict(),
});

const schemaSales = Joi.array().items(schemaNewSale);

const validate = async (obj) => {
  try {
    const val = await schemaNewProduct.validateAsync(obj);
    if (val) return true;
  } catch (err) {
    return { error: { message: err.details[0].message, code: 'Invalid_data' } };
  }
};

const validateSales = async (obj) => {
  const val = await schemaSales.validateAsync(obj).catch((err) => {
    return { error: { message: err.details[0].message, code: 'Invalid_data' } };
  });
  return val;
};

module.exports = {
  validate,
  validateSales,
};
