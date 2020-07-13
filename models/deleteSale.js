const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const deleteSale = async (id) =>
  stockConnection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = deleteSale;
