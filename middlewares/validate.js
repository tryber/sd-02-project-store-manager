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

const validate = async (obj) => {
  try {
    const val = await schemaNewProduct.validateAsync(obj);
    if (val) return true;
  } catch (err) {
    return { error: { message: err.details[0].message, code: 422 } };
  }
};

module.exports = {
  validate,
};
