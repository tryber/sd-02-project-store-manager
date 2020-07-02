const ObjectId = require('mongodb').ObjectID;
const { getAllData, getDataFromField } = require('./utils/getData');
const { addData } = require('./utils/addData');

const getAllProducts = getAllData('products');

const getProductByName = (name) => getDataFromField('products', { name });

const getProductById = (_id) => getDataFromField('products', { _id: new ObjectId(_id) });

const addNewProduct = (name, quantity) => addData('products', { name, quantity });

module.exports = {
  getAllProducts,
  getProductByName,
  addNewProduct,
  getProductById,
};
