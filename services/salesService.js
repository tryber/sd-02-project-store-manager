const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const validateSales = async (sale) => {
  const arrayOfIds = sale.map(({ productId }) => productId);
  const arrayOfRepeatedIds = await productsService.repeatedIds(arrayOfIds);

  if (arrayOfRepeatedIds === 'not_found') {
    return {
      error: 'Produto não encontrado',
      code: 'not_found',
      status: 400,
    };
  }

  const isIdValid = (sale.length === arrayOfRepeatedIds.length);

  const isQuantityValid = sale.some(({ quantity }) => !Number.isInteger(quantity) || quantity <= 0);
  if (isQuantityValid || !isIdValid) {
    return {
      error: 'Quantidade inválida',
      code: 'invalid_data',
      status: 422,
    };
  }
  return { error: false };
};

const createSales = (sale) => salesModel.createSales(sale);

const getAllSales = salesModel.getAllSales();

const findSaleById = (id) => salesModel.findSaleById(id);

const deleteSaleById = (id) => salesModel.deleteSaleById(id);

const updateSale = (id, updatedSale) => salesModel.updateSale(id, updatedSale);

module.exports = {
  createSales,
  validateSales,
  getAllSales,
  findSaleById,
  deleteSaleById,
  updateSale,
};
