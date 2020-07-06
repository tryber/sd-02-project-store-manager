const express = require('express');
const { getAllSales, getSaleById, validateSale, updateSale, checkSaleId,
  createSale, deleteSale, checkStock } = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(getAllSales)
  .post(validateSale, checkStock, createSale);

router
  .route('/:id')
  .get(getSaleById)
  .delete(checkSaleId, deleteSale)
  .put(checkSaleId, validateSale, updateSale);

module.exports = router;
