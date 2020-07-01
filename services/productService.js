const productModel = require('../models/productModel');

const listAllProducts = async () =>
  productModel.getAllProducts();

const showSingleProduct = async (id) =>
  productModel.getProductById(id);

const createNewProduct = async (product) =>
  productModel.addProduct(product);

module.exports = {
  listAllProducts,
  showSingleProduct,
  createNewProduct,
};
