const ObjectId = require('mongodb').ObjectID;
const { getAllData, getDataFromField } = require('./utils/getData');

const getAllSales = getAllData('sales');

const saleById = async (_id) => getDataFromField('sales', { _id: new ObjectId(_id) });

module.exports = {
  getAllSales,
  saleById,
};
