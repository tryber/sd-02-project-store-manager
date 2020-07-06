const Joi = require('@hapi/joi');

const { getAllProducts, getProductByName, updateProduct, addQuantity, removeQuantity,
  addNewProduct, getProductById, deleteProductByID } = require('../models/productsModel');

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
    return { error: error.details[0].message, code: 'invalid_data' };
  }
  return { error: false };
};

const checkProduct = async ({ name }) => {
  const productFound = await getProductByName(name);
  if (productFound.length) {
    return { message: 'Product already exists', code: 'invalid_data' };
  }
  return { message: false };
};

const addProduct = async ({ name, quantity }) => addNewProduct(name, quantity);

const getProductId = async ({ id }) => getProductById(id);

const deleteProduct = async ({ id }) => deleteProductByID(id);

const updateProductById = async ({ id }, body) => updateProduct(id, body);

const addToProductCount = async (products) => {
  Promise.all(products.map(({ productId, quantity }) => addQuantity(productId, quantity)));
};

const serviceStockChecker = async (prod) => {
  const productsArray = await Promise.all(prod.map(({ productId }) => getProductById(productId)));
  const canSell = [];
  productsArray.forEach((product, i) => {
    console.log(1, product);
    console.log(2, prod[i]);
    if (product[0].quantity <= prod[i].quantity) {
      canSell.push(i);
    }
  });
  console.log(canSell);
  return !canSell.length;
};

const removeService = async (products) => {
  console.log(products);
  Promise.all(products.map(({ productId, quantity }) => removeQuantity(productId, quantity)));
};

module.exports = {
  getProducts,
  validationProductService,
  checkProduct,
  addProduct,
  getProductId,
  deleteProduct,
  updateProductById,
  addToProductCount,
  serviceStockChecker,
  removeService,
};
