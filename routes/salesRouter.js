const express = require('express');
const { getAllSales, getSaleById, validateSale, updateSale, checkSaleId,
  createSale, deleteSale } = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(getAllSales)
  .post(validateSale, createSale);

router
  .route('/:id')
  .get(getSaleById)
  .delete(deleteSale)
  .put(checkSaleId, validateSale, updateSale);

module.exports = router;
