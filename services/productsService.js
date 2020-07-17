const productsModel = require('../models/productsModel');

const getAllProducts = productsModel.getAll();

const createProducts = (products) => productsModel.createProducts(products);

const getProductById = (id) => productsModel.getProductById(id);

const deleteProductById = (id) => productsModel.deleteProduct(id);

const updateProductById = (id, updatedProduct) => productsModel.updateProduct(id, updatedProduct);

const repeatedIds = (arrayOfIds) => productsModel.repeatedIds(arrayOfIds);

const validateProducts = (name, quantity) => {
  if (typeof name !== 'string' || name.length < 5) {
    return { error: 'Nome ou Quantidade inválidos', code: 'invalid_data' };
  }
  if (typeof quantity !== 'number' || quantity <= 0) {
    return { error: 'Nome ou Quantidade inválidos', code: 'invalid_data' };
  }
  return { error: false };
};

const existProduct = async (name) => {
  const products = await getAllProducts;
  const isProductExists = products.some((product) =>
    product.name.toLowerCase() === name.toLowerCase());
  return isProductExists;
};

module.exports = {
  getAllProducts,
  createProducts,
  validateProducts,
  existProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  repeatedIds,
};
