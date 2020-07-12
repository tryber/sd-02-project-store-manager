const { getOneSale } = require('../models');

const validateId = async ({ id }) =>
  getOneSale(id)
    .then((products) => ({ products }))
    .catch((error) => ({ error }));

module.exports = { validateId };
