const saleModel = require('../models/saleModel');
// const productService = require('./productService');

// const isQuantityValid = (quantity) => {
//   if (quantity < 0) return false;
//   return true;
// };

const listAllSales = async () =>
  saleModel.getAllSales();

const getSaleById = async (id) =>
  saleModel.getSaleById(id);

const insertNewSales = async (salesData) =>
  saleModel.insertNewSales(salesData);

const deleteSale = async (id) =>
  saleModel.deleteSale(id);

module.exports = {
  listAllSales,
  getSaleById,
  insertNewSales,
  deleteSale,
};
