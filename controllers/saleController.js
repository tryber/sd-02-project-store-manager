const express = require('express');
const saleService = require('../services/saleService');
const errorMessage = require('./errorMessages');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sales = await saleService.listAllSales();

  if (!sales) return res.status(500).json({ message: 'Error loading sales. Try again later.' });

  res.status(200).json(sales);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await saleService.getSaleById(id);
    if (!sale) {
      return res.status(404).json(errorMessage.notFoundError);
    }

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});
