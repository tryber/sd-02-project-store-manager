const express = require('express');
const { listSales, listOneSale, newSale, deleteOneProduct, updateOneProduct } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listSales)
  .post(newSale);

router.route('/:id')
  .get(listOneSale)
  .delete(deleteOneProduct)
  .put(updateOneProduct);
module.exports = router;
