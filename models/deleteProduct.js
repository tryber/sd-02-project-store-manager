const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const deleteProduct = async (id) =>
  stockConnection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = deleteProduct;
