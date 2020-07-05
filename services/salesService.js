const { getAllSales, saleById } = require('../models/salesModel.js');

const getSales = getAllSales;

const getSale = async ({ id }) => saleById(id);

module.exports = {
  getSales,
  getSale,
};
