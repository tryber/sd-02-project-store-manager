const { ObjectId } = require('mongodb');
const connection = require('./connections');

const createSales = async (sale) => {
  try {
    connection()
      .then(((db) => db.collection('sales').insertMany(sale)));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  createSales,
};
