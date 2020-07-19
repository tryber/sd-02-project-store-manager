const productModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const alreadyExists = await productModel.findProductByName(name);
  if (alreadyExists) {
    throw { message: 'produto já cadastrado', code: 'already_exists'}
  }
  return await productModel.createProduct({name, quantity})
};

const updateProduct = async (name, quantity, id) => {
  const idExists = await productModel.findProductById(id);
  if (idExists === null) { throw { message: 'produto não encontrado', code: 'not_found'} };
  
  const alreadyExists = await productModel.findProductByName(name, id);
  if (alreadyExists) {
    throw { message: 'produto já cadastrado', code: 'already_exists'}
  }
  await productModel.updateProduct({name, quantity, id});
};

const listProduct = async () => {
  return await productModel.findProducts()
};

const showOneProduct = async (id) => {
  return await productModel.showOneProduct(id)
};

const deleteProduct = async (id) => {
  return await productModel.deleteProduct(id)
};

module.exports = {
  createProduct,
  listProduct,
  showOneProduct,
  deleteProduct,
  updateProduct,
};
