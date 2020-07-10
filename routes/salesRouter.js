const express = require('express');
const {
  listSales,
  saleInsertMany,
  saleById,
  saleDeleteById,
  saleUpdateById,
} = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(listSales)
  .post(saleInsertMany);

router
  .route('/:id')
  .get(saleById)
  .delete(saleDeleteById)
  .put(saleUpdateById);

module.exports = router;
