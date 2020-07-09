const connection = require('./connection');

const createProduct = async (product) => {
  const db = await connection();
  const products = await db.collection('products').insertOne(product);
  return products;
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const findByName = async ({ name }) => {
  const db = await connection();
  const products = await db.collection('products').find({ name }).toArray();
  return products;
};

module.exports = {
  getAll,
  findByName,
  createProduct,
};
