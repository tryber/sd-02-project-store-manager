const productModel = require('../models/productModel');

const newProduct = async (name, quantity) => {
  const existProduct = await productModel.findByName(name);
  if (existProduct.length > 0) {
    return { error: { message: 'Item already exists', code: 409 } };
  }
  const createdProduct = await productModel.createProduct({ name, quantity });
  return createdProduct.ops;
};

const findAll = async () => {
  const getAll = await productModel.getAll();
  return getAll;
};

const findById = async (id) => {
  const product = await productModel.findById(id).catch((error) => {
    const { message } = error;
    return { error: { message, code: 404 } };
  });
  if (product === null) {
    return { error: { message: 'Item not Found', code: 404 } };
  }
  return product;
}

module.exports = {
  newProduct,
  findAll,
  findById,
};
