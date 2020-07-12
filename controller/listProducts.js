const { getAllProducts } = require('../models');

const listProducts = async (_req, res, next) =>
  getAllProducts()
    .then((products) => res.status(200).json({ products }))
    .catch((err) => next({ message: err.message, code: 'internal_error' }));

module.exports = listProducts;
