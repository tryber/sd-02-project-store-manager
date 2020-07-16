const productModel = require('../models/productModel');

const newProduct = async (name, quantity) => {
  const existProduct = await productModel.findByName(name);
  if (existProduct) {
    throw { error: { message: 'Item already exists', code: 'Already_exists' } };
  }
  const createdProduct = await productModel.createProduct({ name, quantity });
  return createdProduct.ops;
};

const findAll = async () => {
  const getAll = await productModel.getAll();
  return getAll;
};

const findById = async (id) => {
  const product = await productModel.findById(id);
  if (product === null) {
    throw { error: { message: 'Item not Found', code: 'Not_found' } };
  }
  return product;
};

const deleteById = async (id) => productModel.deleteById(id);

const updateById = async (id, name, quantity) => {
  const productExist = await productModel.findById(id);
  if (productExist === null) {
    throw { error: { message: 'Item not Found', code: 'Not_found' } };
  }
  const updatedProduct = await productModel.updateById(id, name, quantity);
  return updatedProduct.value;
};

module.exports = {
  newProduct,
  findAll,
  findById,
  deleteById,
  updateById,
};
