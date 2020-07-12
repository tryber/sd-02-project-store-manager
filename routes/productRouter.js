const express = require('express');
const { listProducts, listOneProduct, newProduct, deleteOneProduct } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listProducts)
  .post(newProduct);

router.route('/:id')
  .get(listOneProduct)
  .delete(deleteOneProduct);
module.exports = router;
