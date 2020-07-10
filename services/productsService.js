const joinSchemas = require('./joinSchemas');

const Boom = require('@hapi/boom');

const productsModel = require('../models/productsModels');

async function create(body) {
  try {
    const { error, value: product } = joinSchemas.productsSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      throw Boom.badRequest(
        error.name,
        error.details.map(({ message }) => message),
      );
    }

    const productDb = await productsModel.find({ name: product.name, field: 'name' });

    if (!productDb) {
      throw Boom.notFound(
        'NotFound',
        error.details.map(({ message }) => message),
      );
    }

    const newProduct = await productsModel.create(product);

    return newProduct;
  } catch (err) {
    throw err;
  }
}

// async function erro1(bool) {
//   return new Promise((resolve, reject) => {
//     if (bool) {
//       resolve(2);
//     }
//     reject(new Error('Bad Request'));
//   });
// }

// async function erro2(bool) {
//   return new Promise((resolve, reject) => {
//     if (bool) {
//       resolve(1);
//     }
//     reject(new Error('Not Implemented'));
//   });
// }

module.exports = {
  create,
};
