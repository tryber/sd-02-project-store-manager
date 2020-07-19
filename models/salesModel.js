const connection = require('./connection');

const insertNewSales = async (salesData) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ products: salesData }))
    .then(({ insertedId }) => ({ id: insertedId, products: salesData }));
};

module.exports = { insertNewSales };