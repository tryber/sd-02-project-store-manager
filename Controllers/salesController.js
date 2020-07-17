const express = require('express');
const rescue = require('express-rescue');
const salesModel = require('../Models/salesModel');
const salesValidator = require('../Middlewares/salesValidator');
const boom = require('boom');

const router = express.Router();

router.post('/', salesValidator, rescue(async (req, res, next) => {
  const salesData = Array.isArray(req.body)
    ? req.body.map(({ productId, quantity }) => ({ productId, quantity }))
    : [{ productId: req.body.productId, quantity: req.body.quantity }];

  const newSales = await salesModel.create(salesData);

  return res.status(201).json({
    message: 'Venda(s) criada(s) com sucesso!',
    createdSales: newSales,
  });
}));

router.get('/', rescue(async (_req, res, next) => {
  const sales = await salesModel.getAll();

  if (sales.length === 0) {
    return res.status(200).json({
      message: 'Não há vendas cadastradas ainda',
      sales,
    });
  }

  return res.status(200).json({ sales });
}));

router.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesModel.findById(id);

  if (!sale) {
    return next(boom.notFound('Venda não encontrada'));
  }

  return res.status(200).json({ sale });
}));

router.delete('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesModel.findById(id);

  if (!sale) {
    return next(boom.notFound('Venda não encontrada'));
  }

  await salesModel.remove(id);

  return res.status(200).json({
    message: 'Venda deletada com sucesso!',
    deletedSale: sale,
  });
}));

router.put('/:id', salesValidator, rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesModel.findById(id);

  if (!sale) {
    return next(boom.notFound('Venda não encontrada'));
  }

  const { productId, quantity } = req.body;

  const updatedSale = await salesModel.update(id, productId, quantity);

  return res.status(200).json({
    message: 'Venda atualizada com sucesso!',
    updatedSale,
  });
}));

module.exports = router;
