const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const getAllSales = async () => salesModel.getAllSales();

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

module.exports = {
  getAllSales,
  listOfExistProducts,
};
