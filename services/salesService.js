const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const validateSales = async (sale) => {
  const arrayOfIds = sale.map(({ productId }) => ObjectId(productId));
  const arrayOfRepeatedIds = await productsService.repeatedIds(arrayOfIds);
  const isIdValid = (sale.length === arrayOfRepeatedIds.length);

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

const getAllSales = salesModel.getAllSales();

const findSaleById = (id) => salesModel.findSaleById(id);

const deleteSaleById = (id) => salesModel.deleteSaleById(id);

module.exports = {
  createSales,
  validateSales,
  getAllSales,
  findSaleById,
  deleteSaleById,
};
