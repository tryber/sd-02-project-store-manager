const boom = require('boom');
const productsModel = require('../Models/productsModel');

const salesValidator = async (req, res, next) => {
  const salesData = Array.isArray(req.body) ? req.body : [req.body];
  // if (!Array.isArray(req.body)) {
  //   return next(boom.badData('Dados inválidos'));
  // }

  const productIds = salesData.map(({ productId }) => productId);

  const products = await Promise.all(productIds.map((id) => productsModel.findById(id)));

  const productIdsAreValid = products.every((product) => product);
  if (!productIdsAreValid) return next(boom.badData('Dados inválidos', 'productId'));

  const quantitiesAreValid = salesData.every(({ quantity }) => (
    typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0
  ));

  return quantitiesAreValid ? next() : next(boom.badData('Dados inválidos', 'quantity'));
};

module.exports = salesValidator;
