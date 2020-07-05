const { getAllSales, saleById, addNewSale, deleteSaleByID } = require('../models/salesModel.js');

const getSales = getAllSales;

const getSale = async ({ id }) => saleById(id);

const addSale = async (products) => addNewSale(products);

const deleteSaleID = async ({ id }) => deleteSaleByID(id);

module.exports = {
  getSales,
  getSale,
  addSale,
  deleteSaleID,
};
