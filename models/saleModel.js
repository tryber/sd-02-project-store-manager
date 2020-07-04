const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const products = await db.collection('sales').find().toArray();
  return products;
};

const getSaleById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  getAllSales,
  getSaleById,
};
