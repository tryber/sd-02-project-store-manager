const productModel = require('../models/productModel');

const listAllProducts = async () =>
  productModel.getAllProducts();

const showSingleProduct = async (id) =>
  productModel.getProductById(id);

const createNewProduct = async (product) =>
  productModel.addProduct(product);

const deleteSingleProduct = async (id) =>
  productModel.deleteProduct(id);

module.exports = {
  listAllProducts,
  showSingleProduct,
  createNewProduct,
  deleteSingleProduct,
};
