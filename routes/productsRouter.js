const express = require('express');
const { getAllProducts, validateProduct,
  addNewProduct, getProductById } = require('../controllers/productsController');

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(validateProduct, addNewProduct);

router
  .route('/:id')
  .get(getProductById);

module.exports = router;
