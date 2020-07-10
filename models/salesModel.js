const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create(products) {
  return connection().then((db) => db.collection('sales').insertOne({ products }));
}

async function find(id) {
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
}

async function list() {
  return connection().then((db) => db.collection('sales').find().toArray());
}

async function remove(id) {
  return connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
}

async function update({ id, products }) {
  return connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { products } }),
  );
}

module.exports = {
  create,
  find,
  list,
  remove,
  update,
};
