const express = require('express');
const { getAllProducts, validateProduct, deleteProductById, updateProduct,
  addNewProduct, getProductById } = require('../controllers/productsController');

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(validateProduct, addNewProduct);

router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProductById)
  .put(validateProduct, updateProduct);

module.exports = router;
