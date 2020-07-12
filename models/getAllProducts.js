const { stockConnection } = require('../connections');

const getAllProducts = async () =>
  stockConnection()
    .then((db) => db.collection('products').find().toArray());

module.exports = getAllProducts;
