const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ sale });
  return sales;
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  findSaleById,
};
