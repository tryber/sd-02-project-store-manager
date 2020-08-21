const schema = require('./schema');

const validateProduct = (data) => {
  const { name, quantity } = data;
  const { error } = schema.product.validate({ name, quantity });
  return error ? error.details[0].message : null;
};

module.exports = {
  validateProduct,
};
