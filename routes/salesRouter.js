const express = require('express');
const { getAllSales, getSaleById } = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(getAllSales);

router
  .route('/:id')
  .get(getSaleById);

module.exports = router;
