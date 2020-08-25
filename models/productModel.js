const { ObjectId } = require('mongodb');
const connection = require('./connection');

const get = async (id) => {
  if (id) {
    const products = await connection().then((db) =>
      db
        .collection('products').findOne(ObjectId(id)));

    return products;
  }
  const products = await connection().then((db) =>
    db
      .collection('products').find().toArray());

  return products;
};

const add = async ({ name, quantity }) => {
  await connection().then((db) =>
    db.collection('products').indexInformation((err, data) => {
      if (!data) return db.collection('products').createIndex({ name: 1 }, { unique: true });
      if (!data.name_1) return db.collection('products').createIndex({ name: 1 }, { unique: true });
    }));

  return connection().then((db) =>
    db
      .collection('products').insertOne({ name, quantity }));
};

const remove = async (id) => connection().then((db) =>
  db
    .collection('products').deleteOne({ _id: ObjectId(id) }));

const update = async ({ id, name, quantity }) => {
  const products = await connection().then((db) =>
    db
      .collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return products;
};

module.exports = {
  get,
  add,
  remove,
  update,
};
