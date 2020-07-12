const express = require('express');
const { listSales, listOneSale, newProduct, deleteOneProduct, updateOneProduct } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listSales)
  .post(newProduct);

router.route('/:id')
  .get(listOneSale)
  .delete(deleteOneProduct)
  .put(updateOneProduct);
module.exports = router;
