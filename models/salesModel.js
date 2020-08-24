const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { ProductNotFound, InsuficientQuantity } = require('../middleware/errorObjects');
const { get: getProduct, remove: removeProduct } = require('./productModel');

const create = async (salesData) => {
  const productsData = await Promise.all(salesData.map(({ productId }) => getProduct(productId)))
    .then((result) => result);

  if (productsData.indexOf(null) !== -1) {
    throw new ProductNotFound(salesData[productsData.indexOf(null)].productId);
  }

  const updateQuantity = productsData
    .map(({ _id: id, quantity: existingQuantity }) =>
      salesData.map(async ({ productId, quantity: soldQuantity }) => {
        if (String(id) === String(productId) && existingQuantity >= soldQuantity) {
          const newQuantity = existingQuantity - soldQuantity;
          if (newQuantity === 0) return removeProduct(id);
          return connection().then((db) => db.collection('products').updateOne({ _id: id }, { $set: { quantity: newQuantity } }));
        }
        throw new InsuficientQuantity(productId);
      }));

  const sales = await Promise.all(...updateQuantity).then(() => connection().then((db) =>
    db
      .collection('sales').insertOne({ products: salesData.map(({ productId, quantity }) => ({ productId, quantity })) })));

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

const update = async (id, products) => {
  const check = await Promise.all(products.map(({ productId }) => getProduct(productId)))
    .then((result) => result);
  if (check.indexOf(null) !== -1) {
    throw new ProductNotFound(products[check.indexOf(null)].productId);
  }
  const sales = await connection().then((db) =>
    db
      .collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { products } }));
  return sales;
};

module.exports = {
  create,
  get,
  remove,
  update,
};
