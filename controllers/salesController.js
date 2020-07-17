const express = require('express');
const salesService = require('../services/salesService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const sales = await salesService.getAllSales;

  if (!sales) {
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados', code: 'db_connection_error' });
  }
  return res.status(200).json({
    message: 'Vendas retornadas com sucesso',
    sales,
  });
});

router.get('/:id', async (req, res) => {
  const saleById = await salesService.findSaleById(req.params.id);

  if (!saleById) {
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados', code: 'db_connection_error' });
  }

  if (saleById.length === 0) {
    return res.status(404).json({ message: 'Venda não encontrada', code: 'not_found' });
  }
  return res.status(200).json({ message: 'Venda Encontrada', saleById });
});

router.post('/', async (req, res) => {
  const isValid = await salesService.validateSales(req.body);
  if (isValid.error) {
    return res.status(422).json({
      message: isValid.message,
      error: isValid.error,
    });
  }
  const insertedSale = await salesService.createSales(req.body);

  if (!insertedSale) {
    return res.status(500).json({
      message: 'Erro de conexão com o banco de dados',
      code: 'db_connection_error',
    });
  }
  return res.status(200).json({
    message: 'Vendas criadas com Sucesso',
  });
});

router.delete('/:id', async (req, res) => {
  const isProductExist = await salesService.findSaleById(`${req.params.id}`);

  if (isProductExist.length === 0) return res.status(400).json({ message: 'Venda não encontrada', code: 'not_found' });

  const isRemoved = await salesService.deleteSaleById(`${req.params.id}`);

  if (!isRemoved) {
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados', code: 'db_connection_error' });
  }

  return res.status(200).json({ message: 'Venda removida', code: 'removed_success' });
});

module.exports = router;
