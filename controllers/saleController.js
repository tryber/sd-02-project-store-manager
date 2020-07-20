const express = require('express');
const saleService = require('../services/saleService');
const errorMessage = require('./errorMessages');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sales = await saleService.listAllSales();

  if (!sales) return res.status(500).json({ message: 'Error loading sales. Try again later.' });

  res.status(200).json(sales);
});

router.post('/', async (req, res) => {
  const validData = Array.isArray(req.body) && req.body
    .reduce((acc, cur) => acc && cur.quantity && cur.quantity > 0 && cur.productId, true);

  if (!validData) return res.status(422).json(errorMessage.invalidSaleDataError);

  try {
    const sales = await saleService.insertNewSales(req.body);
    if (!sales) return res.status(404).json(errorMessage.productNotFoundError);
    res.status(201).json(sales);
  } catch (err) {
    return res.status(500).json(errorMessage.dbError);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await saleService.getSaleById(id);

    if (!sale) {
      return res.status(404).json(errorMessage.saleNotFoundError);
    }

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await saleService.deleteSale(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const validData = Array.isArray(req.body) && req.body
    .reduce((acc, cur) => acc && cur.quantity && cur.quantity > 0 && cur.productId, true);

  if (!validData) {
    return res.status(422).json(errorMessage.invalidSaleDataError);
  }

  try {
    const updatedSale = await saleService.updateSale(id, req.body);

    if (!updatedSale) {
      return res.status(404).json(errorMessage.saleNotFoundError);
    }

    res.status(200).json(updatedSale);
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

module.exports = router;
