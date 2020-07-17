const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const validateSales = async (sale) => {
  const allProducts = await productsService.getAllProducts;
  const isIdValid = sale.every(({ productId }) =>
    allProducts.some(({ id }) => JSON.stringify(id) === JSON.stringify(productId)));
  const isQuantityValid = sale.some(({ quantity }) => !Number.isInteger(quantity) || quantity <= 0);
  if (isQuantityValid || !isIdValid) {
    return {
      error: 'Produto inválido ou Quantidade inválida',
      code: 'invalid_data',
    };
  }

  return { error: false };
};

const createSales = (sale) => salesModel.createSales(sale);

module.exports = {
  createSales,
  validateSales,
};
