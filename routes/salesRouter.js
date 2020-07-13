const express = require('express');
const { listSales, listOneSale, newSale, deleteSale, updateOneProduct } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listSales)
  .post(newSale);

router.route('/:id')
  .get(listOneSale)
  .delete(deleteSale)
  .put(updateOneProduct);
module.exports = router;
