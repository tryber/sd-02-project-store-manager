const { getOneSale, postSales, deleteSale, updateSale } = require('../models');
const { validateId } = require('./product');

const validateIdSale = async ({ id }) =>
  getOneSale(id)
    .then((products) => ({ products }))
    .catch((error) => ({ error }));

const validProduct = async (sales) => {
  const valid = sales.every(({ quantity }) => Number(quantity) > 0 && Number.isInteger(quantity));
  if (!valid) return { error: { message: 'quantity must be larger than or equal to 1', code: 'invalid_data' } };
  const idValid = await Promise.all(sales.map(({ productId }) => validateId({ id: productId })));
  if (idValid.some(({ products }) => !products)) return { error: { message: 'invalid id', code: 'invalid_data' } };
  return postSales(sales)
    .then(({ ops }) => ({ ops }))
    .catch((err) => ({ error: { message: err.message, code: 'internal_error' } }));
};

const deleteFromId = async ({ id }) =>
  deleteSale(id).catch((error) => ({ error }));

const updateAndValidSale = async ({ id, productId, quantity }) => {
  if (!Number(quantity) > 0 || !Number.isInteger(quantity)) {
    return { error: { message: 'quantity must be larger than or equal to 1', code: 'invalid_data' } };
  }
  const { error, products } = await validateId({ id: productId });
  const productBoolean = !products && productId;
  if (productBoolean || error) return { error: { message: 'invalid id', code: 'invalid_data' } };
  return updateSale(id, productId, quantity)
    .then((results) => ({ results }))
    .catch((err) => ({ error: { message: err.message, code: 'internal_error' } }));
};

module.exports = { validateIdSale, validProduct, deleteFromId, updateAndValidSale };
