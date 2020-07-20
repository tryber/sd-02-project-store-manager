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

const getProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const addProduct = async (productData) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne(productData);
  return newProduct.ops[0];
};

const deleteProduct = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

const updateProduct = async (id, productData) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const product = await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: productData });
  return product;
};

const getProductsById = async (productsIds) => {
  const productObjectIds = productsIds.filter(ObjectId.isValid).map(ObjectId);
  if (!productObjectIds.length) return [];
  const db = await connection();
  const products = await db.collection('products').find({ _id: { $in: productObjectIds } }).toArray();
  return products;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductByName,
  getProductsById,
};
