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
  const sales = await saleService.insertNewSales(req.body);

  if (sales.invalidSales) {
    res.status(404).json({
      ...errorMessage.notFoundError,
      data: `${sales.invalidSales.map(({ productId }) => productId)} not found`,
    });
  }

  if (!sales) return res.status(500).json(errorMessage.dbError);

  res.status(200).json(sales.registeredSales);
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
    const deletedSale = await saleService.deleteSale(id);
    if (!deletedSale) {
      return res.status(404).json(errorMessage.saleNotFoundError);
    }

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

module.exports = router;
