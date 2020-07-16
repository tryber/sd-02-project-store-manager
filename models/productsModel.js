const { ObjectId } = require('mongodb');
const connection = require('./connections');

const getAll = async () => (
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) =>
      products.map(({ _id, name, quantity }) => ({
        id: _id,
        name,
        quantity,
      })))
);

const getProductById = async (id) => {
  try {
    const product = await connection()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
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
  try {
    const { result } = await connection()
      .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: updatedProduct }));
    return result;
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
};
