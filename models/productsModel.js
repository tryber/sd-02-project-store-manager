const { getAllData } = require('./utils/getData');

const getAllProducts = getAllData('products');

module.exports = {
  getAllProducts,
};
