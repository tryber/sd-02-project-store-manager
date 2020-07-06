const productsModel = require('../models/productsModel');

const getAllProducts = productsModel.getAll();

module.exports = {
  getAllProducts,
};
