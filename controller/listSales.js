const { getAllSales } = require('../models');

const listSales = async (_req, res, next) =>
  getAllSales()
    .then((sales) => res.status(200).json({ sales }))
    .catch((err) => next({ message: err.message, code: 'internal_error' }));

module.exports = listSales;
