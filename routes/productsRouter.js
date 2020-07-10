const express = require('express');
const {
  listProducts,
  insertProduct,
  productById,
  productDeleteById,
  productUpdateById,
} = require('../controllers/productController');
const router = express.Router();

router
  .route('/')
  .get(listProducts)
  .post(insertProduct);

router
  .route('/:id')
  .get(productById)
  .delete(productDeleteById)
  .put(productUpdateById);

module.exports = router;
