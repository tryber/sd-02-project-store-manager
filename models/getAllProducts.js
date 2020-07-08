const { stockConnection } = require('../connections');

const getAllProducts = async () =>
  stockConnection()
    .then((db) => db.collection('products').find().toArray())
    .then((results) => results);

module.exports = getAllProducts;
