const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const insertSales = async (saleData) => {
  const arrayId = saleData.map(({ productId }) => productId);
  const idFound = await productModel.checkSalesAndId(arrayId);
  if (!idFound || saleData.length !== idFound.length) return null;
  return await salesModel.insertNewSales(saleData);
};

const listSales = async () => {
  return await salesModel.findSales()
};

const showOneSale = async (id) => {
  return await salesModel.showOneSale(id)
};

const deleteSale = async (id) => {
  return await salesModel.deleteSale(id)
};

const updateSale = async (id, salesData) => {
  const idExists = await salesModel.findSaleById(id);
  if (idExists === null) { throw { message: 'Venda não encontrada', code: 'not_found' } };
  return salesModel.updateSale(id, salesData);
};

module.exports = {
  insertSales,
  listSales,
  showOneSale,
  deleteSale,
  updateSale,
};
