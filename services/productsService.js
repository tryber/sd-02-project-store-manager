const { getAllProducts, getProductByName, updateProduct, addQuantity, removeQuantity,
  addNewProduct, getProductById, deleteProductByID } = require('../models/productsModel');

const getProducts = getAllProducts;

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
    if (product[0].quantity <= prod[i].quantity) {
      canSell.push(i);
    }
  });
  return !canSell.length;
};

const removeService = async (products) => {
  Promise.all(products.map(({ productId, quantity }) => removeQuantity(productId, quantity)));
};

module.exports = {
  getProducts,
  checkProduct,
  addProduct,
  getProductId,
  deleteProduct,
  updateProductById,
  addToProductCount,
  serviceStockChecker,
  removeService,
};
