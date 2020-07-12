const { stockConnection } = require('../connections');

const postProduct = async (name, quantity) =>
  stockConnection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

module.exports = postProduct;
