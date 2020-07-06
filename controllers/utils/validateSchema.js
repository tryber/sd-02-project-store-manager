const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),

  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
});

const validationProductService = async ({ name, quantity }) => {
  const { error } = schema.validate({ name, quantity });
  if (error) {
    return { error: error.details[0].message, code: 'invalid_data' };
  }
  return { error: false };
};

module.exports = {
  validationProductService,
};
