const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create({ name, quantity }) {
  return connection().then((db) => db.collection('products').insertOne({ name, quantity }));
}

async function find({ key, value }) {
  if (key === 'id') {
    return connection().then((db) => db.collection('products').findOne(ObjectId(value)));
  }

  return connection().then((db) => db.collection('products').findOne({ [key]: value }));
}

async function list() {
  return connection().then((db) => db.collection('products').find().toArray());
}

async function remove(id) {
  return connection().then((db) => db.collection('products').remove({ _id: ObjectId(id) }));
}

async function update({ id, product: { name, quantity } }) {
  return connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
}

module.exports = {
  create,
  find,
  list,
  remove,
  update,
};
