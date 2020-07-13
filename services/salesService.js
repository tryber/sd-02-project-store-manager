const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const productService = require('./productService');

const getAllSales = async () => {
  const result = await salesModel.getAllSales().catch((fail) => (
    { error: true, message: `${fail.message}`, code: 'internal_error' }
  ));
  return result;
};

const isProductExists = async (ids) => {
  const results = Promise.all(ids.map(async (id) => {
    const item = await productModel.getProductById(id);
    return item;
  }));
  return results;
};

const listOfExistProducts = async (ids) => {
  const resultArr = await isProductExists(ids);
  const result = resultArr
    .map((item, index) => (item === null ? index : -1))
    .filter((arrNumber) => arrNumber !== -1);
  return result;
};

const createMany = async (products) => salesModel.createMany(products);

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id).catch((fail) => (
    { error: true, message: `${fail.message}`, code: 'internal_error' }
  ));
  if (result === null) {
    return {
      error: true,
      message: 'No sale was found with the ID provided',
      code: 'not_found',
    };
  }
  return result;
};

const deleteSaleById = async (id) => {
  const result = await salesModel.deleteSaleById(id).catch((fail) => (
    { error: true, message: `${fail.message}`, code: 'internal_error' }
  ));
  return result;
};

const updateSaleById = async (id, productId, quantity) => {
  console.log('prod', productId);
  const isSaleExists = await getSaleById(id);
  if (isSaleExists.error) return isSaleExists;
  const isProductInDatabase = await productService.getProductById(productId);
  if (isProductInDatabase.error) return isProductInDatabase;
  const result = await salesModel.updateSaleById(id, productId, quantity);
  return result.value;
};

module.exports = {
  getAllSales,
  listOfExistProducts,
  createMany,
  getSaleById,
  deleteSaleById,
  updateSaleById,
};
