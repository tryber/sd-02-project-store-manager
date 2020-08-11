const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const validateProductQuantity = async (arrayOfRepeatedIds, sale) => {
  const isValid = sale.every(({ productId, quantity: saleQuantity }) =>
    arrayOfRepeatedIds.every(({ _id, quantity }) => {
      if (JSON.stringify(productId) === JSON.stringify(_id)) return (quantity - saleQuantity) > 0;
      return true;
    }));
  if (isValid) {
    const updateAll = await Promise.all(sale.map(({ productId, quantity }) =>
      productsService.decrementQuantity(productId, -quantity)));
    return updateAll.every((isUpdated) => isUpdated);
  }
  return false;
};

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

  const isValidProductQuantity = await validateProductQuantity(arrayOfRepeatedIds, sale);

  const isIdValid = (sale.length === arrayOfRepeatedIds.length);

  const isQuantityValid = sale.some(({ quantity }) => !Number.isInteger(quantity) || quantity <= 0);
  if (isQuantityValid || !isIdValid || !isValidProductQuantity) {
    return {
      error: 'Quantidade inválida',
      code: 'invalid_data',
      status: 422,
    };
  }
  return { error: false };
};

const createSales = (sale) => salesModel.createSales(sale);

const getSales = salesModel.getAllSales;

const findSaleById = (id) => salesModel.findSaleById(id);

const deleteSaleById = (id) => salesModel.deleteSaleById(id);

const updateSale = (id, updatedSale) => salesModel.updateSale(id, updatedSale);

module.exports = {
  createSales,
  validateSales,
  getSales,
  findSaleById,
  deleteSaleById,
  updateSale,
};
