const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (product) => {
  console.log(product);
  const db = await connection();
  const products = await db.collection('products').insertOne(product);
  return products;
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const findByName = async (name) => {
  const db = await connection();
  const products = await db.collection('products').find({ name });
  return products;
};

const findById = async (id) => {
  const db = await connection();
  const products = await db.collection('products').findOne({ _id: ObjectId(id) });
  return products;
};

module.exports = {
  getAll,
  findByName,
  createProduct,
  findById,
};
