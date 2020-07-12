const productModel = require('../models/productModel');

const getAllProducts = async () => productModel.getAllProducts();

const createOne = async (name, quantity) => {
  const isUnique = await productModel.getProductByName(name);
  if (isUnique !== null) {
    return {
      error: true,
      message: 'This product already exists',
      code: 'already_exists',
    };
  }
  const result = await productModel.createOneProduct({ name, quantity });
  return result.ops;
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id).catch((fail) => (
    { error: true, message: `${fail.message}`, code: 'internal_error' }
  ));
  if (result === null) {
    return {
      error: true,
      message: 'No product was found with the ID provided',
      code: 'not_found',
    };
  }
  return result;
};

const deleteProductById = async (id) => productModel.deleteProductById(id);

const updateProduct = async (id, name, quantity) => {
  const isUnique = await productModel.getProductByName(name);
  const { _id: isUniqueId } = isUnique || {};
  if (isUnique !== null && !isUniqueId.equals(id)) {
    return {
      error: true,
      message: 'This product already exists with another Id',
      code: 'exists_with_another_id',
    };
  }
  const result = await productModel.updateProductById(id, name, quantity)
    .catch((fail) => (
      { error: true, message: `${fail.message}`, code: 'internal_error' }
    ));
  if (result === null) {
    return { error: true,
      message: 'No product was found with the Id provided',
      code: 'not_found',
    };
  }
  return result;
};

module.exports = {
  getAllProducts,
  createOne,
  getProductById,
  deleteProductById,
  updateProduct,
};
