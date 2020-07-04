const saleModel = require('../models/saleModel');

const listAllSales = async () =>
  saleModel.getAllProducts();

const getSaleById = async (id) =>
  saleModel.getSaleById(id);

module.exports = {
  listAllSales,
  getSaleById,
};
