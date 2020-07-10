const joinSchemas = require('./joinSchemas');

const Boom = require('@hapi/boom');

const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

async function check(body) {
  return Promise.all(
    body.map(async (eachSale) => {
      const { error, value: sale } = joinSchemas.salesSchema.validate(eachSale, {
        abortEarly: false,
      });

      if (error) {
        throw Boom.badRequest(
          'Dados inválidos',
          error.details.map(({ message }) => message),
        );
      }

      const productDb = await productsModel.find({ key: 'id', value: sale.productId });

      if (!productDb) {
        throw Boom.badRequest('Produto não existe');
      }
    }),
  );
}

async function create(body) {
  try {
    await check(body);

    const newProduct = await salesModel.create(body);

    return newProduct.ops[0];
  } catch (err) {
    throw err;
  }
}

async function find(id) {
  try {
    const sale = await salesModel.find(id);

    if (!sale) {
      throw Boom.notFound('Venda não encontrada');
    }

    return sale;
  } catch (err) {
    throw err;
  }
}

async function update({ id, body }) {
  try {
    await await check(body);

    await find(id);

    await salesModel.update({ id, products: body });

    return find(id);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
  update,
};
