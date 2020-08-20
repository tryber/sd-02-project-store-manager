const schema = require('./schema');

const validateProduct = ({ body: { name, quantity } }, res, next) => {
  const { error } = schema.product.validate({ name, quantity });
  if (error) {
    const message = error.details[0].message
    return res.status(422).json({ error: message, code: 'bad_data' });
  }

  next();
}

module.exports = {
  validateProduct,
}
