const express = require('express');
const salesService = require('../services/salesService');

const router = express.Router();

router.post('/', async (req, res) => {
  const isValid = await salesService.validateSales(req.body);
  if (isValid.error) {
    return res.status(422).json({
      message: isValid.message,
      error: isValid.error,
    });
  }
  return res.status(200).json({
    message: 'Vendas criadas com Sucesso',
  });
});

module.exports = router;
