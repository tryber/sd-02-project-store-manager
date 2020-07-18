const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const findByName = async (name) => {
  const db = await connection();
  const products = await db.collection('products').findOne({ name });
  return products;
};

const findByIds = async (ids) => {
  const objectIds = ids.filter(ObjectId.isValid).map(ObjectId);
  if (!objectIds.length) return [];
  const db = await connection();
  const products = await db.collection('products').find({ _id: { $in: objectIds } }).toArray();
  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

const updateById = async (id, name, quantity) => {
  const db = await connection();
  const product = await db.collection('products')
    .findOneAndUpdate({
      _id: ObjectId(id) },
      { $set: { name, quantity } },
      { returnOriginal: false },
    );
  return product;
};

module.exports = {
  getAll,
  findByName,
  createProduct,
  findById,
  deleteById,
  updateById,
  findByIds,
};
