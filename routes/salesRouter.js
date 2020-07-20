const express = require('express');
const { listSales, listOneSale, newSale, deleteSale, updateOneSale } = require('../controller');

const router = express.Router();

router.route('/')
  .get(listSales)
  .post(newSale);

router.route('/:id')
  .get(listOneSale)
  .delete(deleteSale)
  .put(updateOneSale);
module.exports = router;
