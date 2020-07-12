const { stockConnection } = require('../connections');

const getAllSales = async () =>
  stockConnection()
    .then((db) => db.collection('sales').find().toArray());

module.exports = getAllSales;
