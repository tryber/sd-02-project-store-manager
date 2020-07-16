const connection = require('./connection');

const createProduct = async ({ name, quantity }) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(console.log);

const findProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

module.exports = { createProduct, findProductByName };