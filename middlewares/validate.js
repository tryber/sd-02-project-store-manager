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
    const error = { error: { message: err.details[0].message, code: 'Invalid_data' } };
    throw error;
  }
};

const validateSales = async (obj) => {
  try {
    const val = await schemaSales.validateAsync(obj);
    if (val) return true;
  } catch (err) {
    const error = { error: { message: err.details[0].message, code: 'Invalid_data' } };
    throw error;
  }
};

module.exports = {
  validate,
  validateSales,
};
