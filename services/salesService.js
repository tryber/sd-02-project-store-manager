const { getAllSales, saleById, addNewSale, deleteSaleByID,
  updateSale } = require('../models/salesModel.js');

const getSales = getAllSales;

const getSale = async ({ id }) => saleById(id);

const addSale = async (products) => addNewSale(products);

const deleteSaleID = async ({ id }) => deleteSaleByID(id);

const updateSaleById = async ({ id }, body) => updateSale(id, body);

module.exports = {
  getSales,
  getSale,
  addSale,
  deleteSaleID,
  updateSaleById,
};
