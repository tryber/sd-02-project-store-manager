const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findByName = async (nameProduct) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne({ name: nameProduct }));

  if (!productData) return null;

  const { _id, name, quantity } = productData;

  return { id: _id, name, quantity };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productData = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!productData) return null;

  const { _id, name, quantity } = productData;

  return { id: _id, name, quantity };
};

const validateData = async (data) => {
  const { name, quantity } = data;

  if (typeof name !== 'string' || name.length <= 5) {
    return { dataIsValid: false, data: 'name' };
  }

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
    return { dataIsValid: false, data: 'quantity' };
  }

  const nameAlreadyExists = await findByName(name);

  if (nameAlreadyExists) {
    return { dataIsValid: false, data: 'name' };
  }

  return { dataIsValid: true };
};

const create = async (name, quantity) => (
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ id: result.insertedId, name, quantity }))
);

const getAll = async () => (
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => ({
      id: _id,
      name,
      quantity
    })))
);

module.exports = {
  create,
  validateData,
  getAll,
  findById,
};
