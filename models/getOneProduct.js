const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const getOneProduct = async (id) =>
  stockConnection()
    .then((db) => db.collection('products').find({ _id: ObjectId(id) }).toArray())
    .then((results) => results);

module.exports = getOneProduct;
