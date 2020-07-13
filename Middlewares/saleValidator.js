const boom = require('boom');
const productsModel = require('../Models/productsModel');

const saleValidator = async (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return next(boom.badData('Dados inválidos'));
  }

  for (let i = 0; i < req.body.length; i += 1) {
    const { productId, quantity } = req.body[i];

    const productIdIsValid = await productsModel.findById(productId);
    if (!productIdIsValid) {
      return next(boom.badData('Dados inválidos', 'productId'));
    }

    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
      return next(boom.badData('Dados inválidos', 'quantity'));
    }
  }

  return next();

//   return req.body.forEach( async ({ productId, quantity }) => {
//     const productIdIsValid = await productsModel.findById(productId);
// console.log(productIdIsValid)
//     if (!productIdIsValid) {
//       return next(boom.badData('Dados inválidos', 'productId'));
//     }

//     if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
//       return next(boom.badData('Dados inválidos', 'quantity'));
//     }
//   }) || next();
};

module.exports = saleValidator;