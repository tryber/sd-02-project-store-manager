const ObjectId = require('mongodb').ObjectID;
const { getAllData, getDataFromField } = require('./utils/getData');
const { addData } = require('./utils/addData');
const { deleteData } = require('./utils/deleteData');
const { updateData } = require('./utils/updateData');

const getAllSales = getAllData('sales');

const saleById = async (_id) => getDataFromField('sales', { _id: new ObjectId(_id) });

const addNewSale = async (product) => addData('sales', { itensSold: product });

const deleteSaleByID = async (_id) => deleteData('sales', { _id: new ObjectId(_id) });

const updateSale = (_id, body) => (
  updateData('sales', { _id: new ObjectId(_id) }, { itensSold: body })
);

module.exports = {
  getAllSales,
  saleById,
  addNewSale,
  deleteSaleByID,
  updateSale,
};
