const productsModel = require('../models/productsModel');

const getAllProducts = productsModel.getAll();

const createProducts = (products) => productsModel.createProducts(products);

const validateProducts = (name, quantity) => {
  if (typeof name !== 'string' || name.length < 5) {
    return { error: 'Nome inválido', code: 'invalid_data' };
  }
  if (typeof quantity !== 'number' || quantity <= 0) {
    return { error: 'Quantidade inválida', code: 'invalid_data' };
  }
  return { error: false };
};

module.exports = {
  getAllProducts,
  createProducts,
  validateProducts,
};
