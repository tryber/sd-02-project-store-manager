const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const addProduct = async (productData) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne(productData);
  return newProduct;
};

const deleteProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

const updateProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: this });
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
