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

      if (productDb.quantity < eachSale.quantity) {
        throw Boom.badRequest(`Quantidade insuficiente do produto ${productDb.name} no estoque`);
      }
    }),
  );
}

async function consumeProducts(body) {
  return Promise.all(
    body.map(async (product) => {
      console.log(product);
      return productsModel.consume({ id: product.productId, quantity: -product.quantity });
    }),
  );
}

async function create(body) {
  try {
    await check(body);

    const newProduct = await salesModel.create(body);

    await consumeProducts(body);

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

async function remove(id) {
  try {
    const sale = await find(id);

    if (!sale) return;

    const newBody = sale.products.map((product) => {
      product.quantity = -product.quantity;
      return product;
    });

    await consumeProducts(newBody);

    await salesModel.remove(id);
  } catch (err) {
    throw err;
  }
}

async function update({ id, body }) {
  try {
    await check(body);

    const oldSale = await find(id);

    await salesModel.update({ id, products: body });

    const newSale = await find(id);

    const newBody = body.map((product, index) => {
      product.quantity = newSale.products[index].quantity - oldSale.products[index].quantity;
      return product;
    });

    await consumeProducts(newBody);

    return newSale;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
  remove,
  update,
};
