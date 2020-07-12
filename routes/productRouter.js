const express = require('express');
const { listProducts, listOneProduct, newProduct } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listProducts)
  .post(newProduct);

router.route('/:id')
  .get(listOneProduct);
module.exports = router;
