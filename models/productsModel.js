const { ObjectId } = require('mongodb');
const { getAllData, getDataFromField } = require('./utils/getData');
const { addData } = require('./utils/addData');
const { deleteData } = require('./utils/deleteData');
const { updateData, addQty, rmvQty } = require('./utils/updateData');

const getAllProducts = getAllData('products');

const getProductByName = (name) => getDataFromField('products', { name });

const getProductById = (_id) => getDataFromField('products', { _id: new ObjectId(_id) });

const addNewProduct = (name, quantity) => addData('products', { name, quantity });

const deleteProductByID = (_id) => deleteData('products', { _id: new ObjectId(_id) });

const updateProduct = (_id, body) => (
  updateData('products', { _id: new ObjectId(_id) }, body)
);

const addQuantity = (productId, quantity) => (
  addQty('products', { _id: new ObjectId(productId) }, quantity)
);

const removeQuantity = (productId, quantity) => (
  rmvQty('products', { _id: new ObjectId(productId) }, quantity)
);

module.exports = {
  getAllProducts,
  getProductByName,
  addNewProduct,
  getProductById,
  deleteProductByID,
  updateProduct,
  addQuantity,
  removeQuantity,
};
