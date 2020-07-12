const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const getOneProduct = async (id) =>
  stockConnection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

module.exports = getOneProduct;
