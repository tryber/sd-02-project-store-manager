const express = require('express');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const router = express.Router();

router.post('/', rescue(async (req, res, _next) => {
  if (!Array.isArray(req.body)) { throw { message: 'Dados inválidos', code: 'bad_data' }};

  const salesData = req.body.map(({ productId, quantity }) => ({ productId, quantity }));
  
  if (salesData.some(({productId, quantity}) => typeof productId !== 'string' || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)) {
    throw { message: 'Dados inválidos', code: 'bad_data' }
  }

  const newSale = await salesService.insertSales(salesData);
  if (!newSale) { throw { message: 'Dados inválidos', code: 'bad_data' }};
  return res.status(201).json(newSale);
}));


module.exports = router;
