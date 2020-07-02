const productModel = require('../models/productModel');

const listAllProducts = async () =>
  productModel.getAllProducts();

const getProductById = async (id) =>
  productModel.getProductById(id);

const createNewProduct = async (product) => {
  const { name } = product;
  const repeatedProduct = await productModel.getProductByName(name);
  if (repeatedProduct) return { repeated: true };
  return productModel.addProduct(product);
};

const deleteProduct = async (id) =>
  productModel.deleteProduct(id);

const updateProduct = async (id, productData) => {
  const { name } = productData;
  const repeatedProduct = await productModel.getProductByName(name);
  const { _id } = repeatedProduct;
  if (repeatedProduct && id !== _id.toString()) return { repeated: true };
  return productModel.updateProduct(id, productData);
};

module.exports = {
  listAllProducts,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
};
