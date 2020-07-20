const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertNewSales = async (salesData) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ products: salesData }))
    .then(({ insertedId }) => ({ id: insertedId, products: salesData }));
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) { return null };
  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
}

const findSales = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const showOneSale = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = { insertNewSales, findSales, showOneSale };