// const mongodb = require('mongodb');
// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const createOneProduct = async (newProduct) => {
  const db = await connection();
  const product = await db.collection('products').insertOne(newProduct);
  return product;
};

module.exports = {
  getAllProducts,
  getProductByName,
  createOneProduct,
};
