const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { ProductNotFound } = require('../middleware/errorObjects');
const { getProduct } = require('./productModel');

const create = async (data) => {
  const check = await Promise.all(data.map(({ productId }) => getProduct(productId)))
    .then((result) => result);

  if (check.indexOf(null) !== -1) throw new ProductNotFound(data[check.indexOf(null)].productId);

  const sales = await connection().then((db) =>
    db
      .collection('sales').insertOne({ products: data.map(({ productId, quantity }) => ({ productId, quantity })) }));

  return sales;
};

const get = async (id) => {
  if (id) {
    const sales = await connection().then((db) =>
      db
        .collection('sales').findOne(ObjectId(id)));

    return sales;
  }
  const sales = await connection().then((db) =>
    db
      .collection('sales').find().toArray());

  return sales;
};

const remove = async (id) => connection().then((db) =>
  db
    .collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  get,
  remove,
};
