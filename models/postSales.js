const { stockConnection } = require('../connections');

const postSales = async (sales) =>
  stockConnection()
    .then((db) => db.collection('sales').insertOne({ itens: sales }));

module.exports = postSales;
