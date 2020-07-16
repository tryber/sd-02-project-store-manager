const productModel = require('../models/productModel');

const newProduct = async (name, quantity) => {
  const existProduct = await productModel.findByName(name);
  if (existProduct) {
    const err = { error: { message: 'Item already exists', code: 'Already_exists' } };
    throw err;
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
    const err = { error: { message: 'Item not Found', code: 'Not_found' } };
    throw err;
  }
  return product;
};

const deleteById = async (id) => productModel.deleteById(id);

const updateById = async (id, name, quantity) => {
  const productExist = await productModel.findById(id);
  if (productExist === null) {
    const err = { error: { message: 'Item not Found', code: 'Not_found' } };
    throw err;
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
