const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const validateProductQuantityPut = (sale, oldSale) => {
  let product;
  if (sale.length < oldSale.length) {
    return oldSale.reduce((acc, cur) => {
      product = sale.filter(({ productId }) =>
        JSON.stringify(productId) === JSON.stringify(cur.productId));
      if (product[0]) {
        acc.push({ productId: product[0].productId, quantity: product[0].quantity - cur.quantity });
        return acc;
      }
      acc.push({ productId: cur.productId, quantity: -cur.quantity });
      return acc;
    }, []);
  }
  return sale.reduce((acc, cur) => {
    product = oldSale.filter(({ productId }) =>
      JSON.stringify(productId) === JSON.stringify(cur.productId));
    if (product[0]) {
      acc.push({ productId: product[0].productId, quantity: cur.quantity - product[0].quantity });
      return acc;
    }
    acc.push({ productId: cur.productId, quantity: cur.quantity });
    return acc;
  }, []);
};

const validateProductQuantity = async (arrayOfRepeatedIds, sale, oldSale) => {
  let newSale = sale;
  if (oldSale) newSale = validateProductQuantityPut(sale, oldSale[0].sale);
  const isValid = newSale.every(({ productId, quantity: saleQuantity }) =>
    arrayOfRepeatedIds.every(({ _id, quantity }) => {
      if (JSON.stringify(productId) === JSON.stringify(_id)) return (quantity - saleQuantity) >= 0;
      return true;
    }));
  if (isValid) {
    const updateAll = await Promise.all(newSale.map(({ productId, quantity }) =>
      productsService.decrementQuantity(productId, -quantity)));
    if (updateAll.every((isUpdated) => isUpdated)) return { error: false };
  }
  return {
    error: 'Quantidade de produto insuficiente',
    code: 'invalid_data',
    status: 422,
  };
};

const validateProductQuantityDelete = async (oldSale) => {
  const arrayOfIds = oldSale.map(({ productId }) => productId);
  const arrayOfRepeatedIds = await productsService.repeatedIds(arrayOfIds);

  if (arrayOfRepeatedIds === 'not_found') {
    return {
      error: 'Produto não encontrado',
      code: 'not_found',
      status: 400,
    };
  }
  const updateAll = await Promise.all(oldSale.map(({ productId, quantity }) =>
    productsService.decrementQuantity(productId, quantity)));
  const isValidUpdate = updateAll.every((isUpdated) => isUpdated);
  if (!isValidUpdate) {
    return {
      error: 'Dados Inválidos',
      code: 'invalid_data',
      status: 422,
    };
  }
  return { error: false };
};

const isQuantityValid = (sale, arrayOfRepeatedIds) => {
  const isIdValid = (sale.length === arrayOfRepeatedIds.length);
  const isSaleQuantityIsValid = sale.some(({ quantity }) =>
    !Number.isInteger(quantity) || quantity <= 0);
  if (isSaleQuantityIsValid || !isIdValid) {
    return {
      error: 'Quantidade inválida',
      code: 'invalid_data',
      status: 422,
    };
  }
  return { error: false };
};

const validateSales = async (sale, oldSale) => {
  const arrayOfIds = sale.map(({ productId }) => productId);
  const arrayOfRepeatedIds = await productsService.repeatedIds(arrayOfIds);

  if (arrayOfRepeatedIds === 'not_found') {
    return {
      error: 'Produto não encontrado',
      code: 'not_found',
      status: 400,
    };
  }

  const isValidProductQuantity = await validateProductQuantity(arrayOfRepeatedIds, sale, oldSale);
  if (isValidProductQuantity.error) return isValidProductQuantity;

  const isValid = isQuantityValid(sale, arrayOfRepeatedIds);
  if (isValid.error) return isValid;

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
  validateProductQuantityDelete,
};
