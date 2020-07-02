const { getProducts, validationProductService, deleteProduct,
  checkProduct, addProduct, getProductId, updateProductById,
} = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const products = await getProducts();
  res.status(200).json({
    products,
  });
};

const validateProduct = async (req, res, next) => {
  const isValid = await validationProductService(req.body);
  if (isValid.error) {
    return res.status(422).json({
      error: { message: isValid.error, code: isValid.code },
    });
  }
  next();
};

const addNewProduct = async (req, res) => {
  const productExists = await checkProduct(req.body);
  if (productExists.message) {
    return res.status(403).json({
      error: productExists,
    });
  }
  const productCreated = await addProduct(req.body);
  return res.status(201).json({
    ...productCreated[0],
  });
};

const getProductById = async (req, res) => {
  try {
    const productById = await getProductId(req.params);
    if (productById.length) {
      return res.status(201).json({
        ...productById[0],
      });
    }
    return res.status(404).json({
      error: {
        message: 'Product not found', code: 'not_found',
      },
    });
  } catch (err) {
    return res.status(404).json({
      error: {
        message: 'Wrong id format', code: 'not_found',
      },
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productDeleted = await deleteProduct(req.params);
    console.log(productDeleted);
    if (productDeleted.length) {
      return res.status(200).json({
        ...productDeleted[0],
      });
    }
    return res.status(404).json({
      error: {
        message: 'Product not found', code: 'not_found',
      },
    });
  } catch (error) {
    return res.status(404).json({
      error: {
        message: 'Wrong id format', code: 'not_found',
      },
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productUpdated = await updateProductById(req.params, req.body);
    if (productUpdated.length) {
      return res.status(200).json({
        ...productUpdated[0],
      });
    }
    return res.status(404).json({
      error: {
        message: 'Product not found', code: 'not_found',
      },
    });
  } catch (error) {
    return res.status(404).json({
      error: {
        message: 'Wrong id format', code: 'not_found',
      },
    });
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
