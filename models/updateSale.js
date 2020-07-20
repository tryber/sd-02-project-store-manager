const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const updateSale = async (id, productId, quantity) =>
  stockConnection()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: (productId) ? { productId, quantity } : { quantity } }));

module.exports = updateSale;
