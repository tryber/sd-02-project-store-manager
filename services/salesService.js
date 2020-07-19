const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const insertSales = async (saleData) => {
  const arrayId = saleData.map(({ productId }) => productId);
  const idFound = await productModel.checkSalesAndId(arrayId);
  if (!idFound || saleData.length !== idFound.length) return null;
  return await salesModel.insertNewSales(saleData);
};

module.exports = {
  insertSales,
}