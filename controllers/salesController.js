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

router.get('/', rescue(async(_req, res) => {
  const products = await salesService.listSales();
  return res.status(200).json(products);
}));

router.get('/:id', rescue(async(req, res) => {
  const { id } = req.params;
  const singleSale = await salesService.showOneSale(id);
  if (singleSale === null) { throw { message: 'Não encontrado', code: 'not_found' }}
  return res.status(200).json(singleSale);
}));

module.exports = router;
