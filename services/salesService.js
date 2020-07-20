const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const insertSales = async (saleData) => {
  const arrayId = saleData.map(({ productId }) => productId);
  const idFound = await productModel.checkSalesAndId(arrayId);
  if (!idFound || saleData.length !== idFound.length) return null;
  return salesModel.insertNewSales(saleData);
};

const listSales = async () => salesModel.findSales();

const showOneSale = async (id) => salesModel.showOneSale(id);

const deleteSale = async (id) => salesModel.deleteSale(id);

const updateSale = async (id, salesData) => {
  const idExists = await salesModel.findSaleById(id);
  if (!idExists) { return null; }
  return salesModel.updateSale(id, salesData);
};

module.exports = {
  insertSales,
  listSales,
  showOneSale,
  deleteSale,
  updateSale,
};
