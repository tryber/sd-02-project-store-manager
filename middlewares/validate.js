const Joi = require('@hapi/joi');

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
  productId: Joi.string().max(100).required(),
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
  const val = await schemaSales.validateAsync(obj).catch((err) => (
    { error: { message: err.details[0].message, code: 'Invalid_data' } }
  ));
  return val;
};

module.exports = {
  validate,
  validateSales,
};
