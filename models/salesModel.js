const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const createOne = async (info) => {
  const db = await connection();
  const createSales = await db.collection('sales').insertMany(info);
  return createSales;
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

const updateSaleById = async (id, productId, quantity) => {
  const db = await connection();
  const updateSale = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { productId, quantity } },
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
