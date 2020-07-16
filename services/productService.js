const productModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const alreadyExists = await productModel.findProductByName(name);
  if (alreadyExists) {
    throw {error: { message: 'produto já cadastrado', code: 'product_exists'}}
  }
  await productModel.createProduct({name, quantity})
};

module.exports = { createProduct };
