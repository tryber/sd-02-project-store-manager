const { ObjectId } = require('mongodb');
const { stockConnection } = require('../connections');

const getOneSale = async (id) =>
  stockConnection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

module.exports = getOneSale;
