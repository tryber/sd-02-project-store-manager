const { stockConnection } = require('../connections');

const postSales = async (sales) =>
  stockConnection()
    .then((db) => db.collection('sales').insertMany(sales));

module.exports = postSales;
