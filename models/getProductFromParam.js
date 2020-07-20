const { stockConnection } = require('../connections');

const getProductFromParam = async (name) =>
  stockConnection()
    .then((db) => db.collection('products').findOne({ name }));

module.exports = getProductFromParam;
