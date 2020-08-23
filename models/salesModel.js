const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { ProductNotFound } = require('../middleware/errorObjects');
const { get } = require('./productModel');

const create = async (data) => {
  const check = await Promise.all(data.map(({ productId }) => get(productId)))
    .then((result) => result);

  if (check.indexOf(null) !== -1) throw new ProductNotFound(data[check.indexOf(null)].productId);

  const sales = await connection().then((db) =>
    db
      .collection('sales').insertOne({ products: data.map(({ productId, quantity }) => ({ productId, quantity })) }));

  return sales;
};

module.exports = {
  create,
};
