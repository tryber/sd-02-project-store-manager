const { getAllData } = require('./utils/getData');

const getAllSales = getAllData('sales');

module.exports = {
  getAllSales,
};
