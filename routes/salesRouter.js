const express = require('express');
const {
  listSales,
  saleInsert,
  saleById,
  saleDeleteById,
  saleUpdateById,
} = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(listSales)
  .post(saleInsert);

router
  .route('/:id')
  .get(saleById)
  .delete(saleDeleteById)
  .put(saleUpdateById);

module.exports = router;
