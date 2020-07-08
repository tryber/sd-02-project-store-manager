const { getOneProduct } = require('../models');

const validateId = async ({ id }) =>
  getOneProduct(id).then((products) => ({ products }))
    .catch((err) => ({ message: err.message }));

module.exports = { validateId };
