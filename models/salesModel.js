const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (products) => {
  const db = await connection();
  const sales = await db.collection('sales').insertMany(products);
  return sales;
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const findById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  findById,
};
