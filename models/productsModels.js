const connection = require('./connection');

async function create({ name, quantity }) {
  return connection().then((db) => db.collection('products').insertOne({ name, quantity }));
}

async function find({ key, value }) {
  return connection().then((db) => db.collection('products').findOne({ [key]: value }));
}

module.exports = {
  create,
  find,
};
