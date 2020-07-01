const express = require('express');
const { getAllSales } = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(getAllSales);

module.exports = router;
