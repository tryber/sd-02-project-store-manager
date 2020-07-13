const boom = require('boom');
const productsModel = require('../Models/productsModel');

// const validateProductId = async (productId) => {
//   const productIdIsValid = await productsModel.findById(productId);

//   return productIdIsValid;
// };

// const validateQuantity = (quantity) => {
//   const quantityIsValid = (
//     typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0
//   );

//   return quantityIsValid;
// };

const saleValidator = async (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return next(boom.badData('Dados inválidos'));
  }

  const productIds = req.body.map(({ productId }) => productId);

  const products = await Promise.all(productIds.map((id) => productsModel.findById(id)));

  const productIdsAreValid = products.every((product) => product);
  if (!productIdsAreValid) return next(boom.badData('Dados inválidos', 'productId'));

  const quantitiesAreValid = req.body.every(({ quantity }) => (
    typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0
  ));

  return quantitiesAreValid ? next() : next(boom.badData('Dados inválidos', 'quantity'));

  // const productIds = req.body.map(({ productId }) => productId);

  // const productIdsAreValid = req.body.every(async ({ productId }) => {
  //   const productIdIsValid = await productsModel.findById(productId);
  //   console.log(productIdIsValid)
  //   return productIdIsValid;
  // });



  // if (!productIdsAreValid) return next(boom.badData('Dados inválidos', 'productId'));

  // const quantityIsValid = req.body.every(({ quantity }) => (
  //   typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0
  // ));

  // return quantityIsValid ? next() : next(boom.badData('Dados inválidos', 'quantity'));

  // for (let i = 0; i < req.body.length; i += 1) {
  //   const { productId, quantity } = req.body[i];

  //   const productIdIsValid = validateProductId(productId);
  //   if (!productIdIsValid) {
  //     return next(boom.badData('Dados inválidos', 'productId'));
  //   }

  //   if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
  //     return next(boom.badData('Dados inválidos', 'quantity'));
  //   }
  // }

  // return next();

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