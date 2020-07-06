// const mongodb = require('mongodb');
// const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createOneProduct = async (newProduct) => {
  const db = await connection();
  const product = await db.collection('products').insertOne(newProduct);
  return product;
};

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

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

module.exports = {
  createOneProduct,
  getAllProducts,
  getProductByName,
  getProductById,
};
