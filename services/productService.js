const productModel = require('../models/productModel');

const newProduct = async (name, quantity) => {
  const existProduct = await productModel.findByName(name).catch((error) => {
    const { message } = error;
    return { error: { message, code: 404 } };
  });
  if (existProduct !== null) {
    return { error: { message: 'Item already exists', code: 409 } };
  }
  const createdProduct = await productModel.createProduct({ name, quantity });
  return createdProduct.ops;
};

const findAll = async () => {
  const getAll = await productModel.getAll().catch((error) => {
    const { message } = error;
    return { error: { message, code: 404 } };
  });;
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
};

// Perguntar sobre o status 204, 404 e 406 para Not Found

const deleteById = async (id) => {
  const product = await productModel.deleteById(id).catch((error) => {
    const { message } = error;
    return { error: { message, code: 404 } };
  });
  if (product.value === null) {
    return { error: { message: 'Item not found', code: 404 } };
  }
  return product;
};

const updateById = async (id, name, quantity) => {
  const productExist = await productModel.findById(id).catch((error) => {
    const { message } = error;
    return { error: { message, code: 404 } };
  });
  if (productExist === null) {
    return { error: { message: 'Item not Found', code: 404 } };
  }
  if (productExist.error) return productExist;
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
