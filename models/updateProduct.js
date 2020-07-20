const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const updateProduct = async (id, name, quantity) =>
  stockConnection()
    .then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

module.exports = updateProduct;
