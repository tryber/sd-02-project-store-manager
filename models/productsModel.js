const { ObjectId } = require('mongodb');
const connection = require('./connections');

const getAll = async () => {
  try {
    const allProducts = await connection()
      .then((db) => db.collection('products').find().toArray())
      .then((products) =>
        products.map(({ _id, name, quantity }) => ({
          id: _id,
          name,
          quantity,
        })));
    return allProducts;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const product = await connection()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    return product || [];
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getProductByName = async (name) => {
  try {
    const product = await connection()
      .then((db) => db.collection('products').findOne({ name }));
    return product || [];
  } catch (err) {
    console.error(err);
    return false;
  }
};

const createProducts = async (product) => {
  try {
    connection()
      .then(((db) => db.collection('products').insertOne(product)));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const { result } = await connection()
      .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const updateProduct = async (id, updatedProduct) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const { result } = await connection()
      .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: updatedProduct }));
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const decQuantityProduct = async (id, quantity) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const { result } = await connection()
      .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $inc: { quantity } }));
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const repeatedIds = async (arrayIds) => {
  const isValidIds = arrayIds.every((id) => ObjectId.isValid(id));
  if (!isValidIds) return 'not_found';
  const validIds = arrayIds.map((id) => ObjectId(id));
  try {
    const arrayOfMatchIds = await connection()
      .then((db) => db.collection('products').find({ _id: { $in: validIds } }).toArray());
    return arrayOfMatchIds;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  getAll,
  createProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  repeatedIds,
  getProductByName,
  decQuantityProduct,
};
