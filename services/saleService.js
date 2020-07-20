const saleModel = require('../models/saleModel');
const productService = require('./productService');

const listAllSales = async () =>
  saleModel.getAllSales();

const getSaleById = async (id) =>
  saleModel.getSaleById(id);

const insertNewSales = async (salesData) => {
  const productsIds = salesData.map(({ productId }) => productId);
  const products = await productService.getProductsById(productsIds);
  if (!products || salesData.length !== products.length) return null;
  return saleModel.insertNewSales(salesData);
};

const deleteSale = async (id) =>
  saleModel.deleteSale(id);

const updateSale = async (id, saleData) => {
  const productsIds = saleData.map(({ productId }) => productId);
  const validSale = await saleModel.getSaleById(id);
  const products = await productService.getProductsById(productsIds);
  if (!validSale || !products || saleData.length !== products.length) return null;
  return saleModel.updateSale(id, saleData);
};

module.exports = {
  listAllSales,
  getSaleById,
  insertNewSales,
  deleteSale,
  updateSale,
};
