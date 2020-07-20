const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const createOne = async (sales) => {
  const db = await connection();
  const createSales = await db.collection('sales').insertOne({ sales });
  return createSales.ops[0];
};

const getSaleById = async (id) => {
  const db = await connection();
  const saleFound = await db.collection('sales').findOne(ObjectId(id));
  return saleFound;
};

const deleteSaleById = async (id) => {
  const db = await connection();
  const deleteSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deleteSale;
};

const updateSaleById = async (id, sales) => {
  const db = await connection();
  const updateSale = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { sales } },
      { returnOriginal: false },
    );
  return updateSale;
};

module.exports = {
  getAllSales,
  createOne,
  getSaleById,
  deleteSaleById,
  updateSaleById,
};
