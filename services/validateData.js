const schema = require('./schema');

const validateProduct = (data) => {
  const { name, quantity } = data;
  const { error } = schema.product.validate({ name, quantity });
  return error ? error.details[0].message : null;
};

const validateSales = (data) => {
  const { productId, quantity } = data;
  const { error } = schema.sales.validate({ productId, quantity });
  return error ? error.details[0].message : null;
};

module.exports = {
  validateProduct,
  validateSales,
};
