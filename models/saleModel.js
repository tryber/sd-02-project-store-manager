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
  const product = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return product;
};

const insertNewSales = async (salesData) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ products: salesData });
  return sales.ops[0];
};

const getSaleByProductId = async (productId) => {
  const db = connection();
  const productSale = await db.collection('sales').findOne({ productId });
  return productSale;
};

const deleteSale = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

const updateSale = async (id, saleData) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { products: saleData } },
    { returnOriginal: false },
  );
  return sale.value;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertNewSales,
  getSaleByProductId,
  deleteSale,
  updateSale,
};
