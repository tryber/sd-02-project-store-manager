const productModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const alreadyExists = await productModel.findProductByName(name);
  if (alreadyExists) {
    throw { message: 'produto já cadastrado', code: 'already_exists'}
  }
  return await productModel.createProduct({name, quantity})
};

const listProduct = async () => {
  return await productModel.findProducts()
};

const showOneProduct = async (id) => {
  return await productModel.showOneProduct(id)
};


module.exports = { createProduct, listProduct, showOneProduct };
