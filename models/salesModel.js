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

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

const updateSaleById = async (id, sale) => {
  const db = await connection();
  const updatesSale = await db.collection('sales')
    .findOneAndUpdate({
      _id: ObjectId(id) },
      { $set: { sale } },
      { returnOriginal: false },
    );
  return updatesSale;
};

module.exports = {
  createSale,
  getAllSales,
  findSaleById,
  deleteSaleById,
  updateSaleById,
};
