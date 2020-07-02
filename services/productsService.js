const Joi = require('@hapi/joi');

const { getAllProducts, getProductByName,
  addNewProduct, getProductById } = require('../models/productsModel');

const getProducts = getAllProducts;

const schema = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),

  quantity: Joi.number()
    .integer()
    .min(1),
});

const validationProductService = async ({ name, quantity }) => {
  const { error } = schema.validate({ name, quantity });
  if (error) {
    return { error: error.details[0].message, code: 'Invalid_data' };
  }
  return { error: false };
};

const checkProduct = async ({ name }) => {
  const productFound = await getProductByName(name);
  if (productFound.length) {
    return { message: 'Product already exists', code: 'Invalid_data' };
  }
  return { message: false };
};

const addProduct = async ({ name, quantity }) => addNewProduct(name, quantity);

const getProductId = async ({ id }) => getProductById(id);

module.exports = {
  getProducts,
  validationProductService,
  checkProduct,
  addProduct,
  getProductId,
};
