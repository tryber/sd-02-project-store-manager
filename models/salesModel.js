const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const createOne = async (info) => {
  const db = await connection();
  const sales = await db.collection('sales').insertMany(info);
  return sales;
};

module.exports = {
  getAllSales,
  createOne,
};
