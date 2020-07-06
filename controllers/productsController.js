const { getProducts, deleteProduct,
  checkProduct, addProduct, getProductId, updateProductById,
} = require('../services/productsService');
const { validationProductService } = require('./utils/validateSchema');

const getAllProducts = async (req, res) => {
  const products = await getProducts();
  res.status(200).json({
    products,
  });
};

const validateProduct = async (req, res, next) => {
  const isValid = await validationProductService(req.body);
  if (isValid.error) {
    return next({ code: isValid.code, message: isValid.error });
  }
  next();
};

const addNewProduct = async (req, res, next) => {
  const productExists = await checkProduct(req.body);
  if (productExists.message) {
    return next({ code: productExists.code, message: productExists.message });
  }
  const productCreated = await addProduct(req.body);
  return res.status(201).json({
    ...productCreated[0],
  });
};

const getProductById = async (req, res, next) => {
  try {
    const productById = await getProductId(req.params);
    if (productById.length) {
      return res.status(201).json({
        ...productById[0],
      });
    }
    next({ code: 'not_found', message: 'Product not found' });
  } catch (err) {
    next({ code: 'invalid_data', message: 'Wrong id format' });
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const productDeleted = await deleteProduct(req.params);
    if (productDeleted.length) {
      return res.status(200).json({
        ...productDeleted[0],
      });
    }
    next({ code: 'not_found', message: 'Product not found' });
  } catch (error) {
    next({ code: 'invalid_data', message: 'Wrong id format' });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productUpdated = await updateProductById(req.params, req.body);
    if (productUpdated.length) {
      return res.status(200).json({
        ...productUpdated[0],
      });
    }
    next({ code: 'not_found', message: 'Product not found' });
  } catch (error) {
    next({ code: 'invalid_data', message: 'Wrong id format' });
  }
};

module.exports = {
  getAllProducts,
  validateProduct,
  addNewProduct,
  getProductById,
  deleteProductById,
  updateProduct,
};
