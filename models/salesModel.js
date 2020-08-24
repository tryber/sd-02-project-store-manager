const { ObjectId } = require('mongodb');
const connection = require('./connection');
const isQuantitySuficient = require('../services/complexCalculation');
const { ProductNotFound, InsuficientQuantity } = require('../middleware/errorObjects');
const { get: getProduct, remove: removeProduct } = require('./productModel');

const create = async (salesData) => {
  const productsData = await Promise.all(salesData.map(({ productId }) => getProduct(productId)))
    .then((result) => result);

  if (productsData.indexOf(null) !== -1) {
    throw new ProductNotFound(salesData[productsData.indexOf(null)].productId);
  }

  if (!isQuantitySuficient(productsData, salesData)) throw new InsuficientQuantity();

  const updateValues = productsData.map(({ _id: id, quantity: existingQuantity }) =>
    salesData.map(async ({ productId, quantity: soldQuantity }) => {
      if (String(id) === String(productId)) {
        if (existingQuantity >= soldQuantity) {
          const newQuantity = existingQuantity - soldQuantity;
          if (newQuantity === 0) await removeProduct(id);
          await connection().then((db) => db.collection('products').updateOne({ _id: id }, { $set: { quantity: newQuantity } }));
        }
      }
    }));

  const sales = await Promise.all(updateValues).then(() => connection().then((db) =>
    db.collection('sales').insertOne({ products: productsData.map(({ _id, name }, index) => (
      { productId: _id, name, quantity: salesData[index].quantity })) })))
    .catch((err) => {
      throw err;
    });

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

const remove = async (id) => {
  const { products } = await get(id);

  const updateQuantity = await products
    .map(({ productId, name, quantity: soldQuantity }) => connection().then((db) =>
      db
        .collection('products')
        .updateOne(
          { _id: productId },
          { $set: { name }, $inc: { quantity: soldQuantity } },
          { upsert: true },
        )));

  const sales = await Promise.all(updateQuantity).then(() => connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) })));

  return sales;
};

const update = async (salesId, salesData) => {
  const productsData = await Promise.all(salesData.map(({ productId }) => getProduct(productId)))
    .then((result) => result);

  if (productsData.indexOf(null) !== -1) {
    throw new ProductNotFound(salesData[productsData.indexOf(null)].productId);
  }

  const updateQuantity = productsData
    .map(({ _id: id, quantity: existingQuantity }) =>
      salesData.map(async ({ productId, quantity: updatedQuantity }) => {
        const { products } = await get(salesId);
        const [{ quantity: alreadySoldQty }] = products
          .filter(({ productId: thisId }) => String(thisId) === String(productId));

        const difference = alreadySoldQty - updatedQuantity;

        if (String(id) === String(productId)) {
          if (existingQuantity >= difference * -1) {
            const newQuantity = existingQuantity + difference;
            if (newQuantity === 0) return removeProduct(id);
            return connection().then((db) => db.collection('products').updateOne({ _id: id }, { $set: { quantity: newQuantity } }));
          }
          throw new InsuficientQuantity(productId);
        }
        return undefined;
      }));

  const sales = await Promise.all(updateQuantity).then(() => connection().then((db) =>
    db
      .collection('sales').updateOne({ _id: ObjectId(salesId) }, { $set: { products: salesData } })));

  return sales;
};

module.exports = {
  create,
  get,
  remove,
  update,
};
