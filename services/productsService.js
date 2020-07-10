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
        'Dados inválidos',
        error.details.map(({ message }) => message),
      );
    }

    const productDb = await productsModel.find({ key: 'name', value: product.name });

    if (productDb) {
      throw Boom.badRequest('Produto já existe');
    }

    const newProduct = await productsModel.create(product);

    return newProduct.ops[0];
  } catch (err) {
    throw err;
  }
}

async function find(id) {
  try {
    const product = await productsModel.find({ key: 'id', value: id });

    if (!product) {
      throw Boom.notFound('Produto não cadastrado');
    }

    return product;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
};
