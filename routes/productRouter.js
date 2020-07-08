const express = require('express');
const { listProducts, listOneProduct } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listProducts);

router.route('/:id')
  .get(listOneProduct);
module.exports = router;
