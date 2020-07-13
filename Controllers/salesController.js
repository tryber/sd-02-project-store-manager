const express = require('express');
const salesModel = require('../Models/salesModel');
const salesValidator = require('../Middlewares/salesValidator');
const boom = require('boom');

const router = express.Router();

router.post('/', salesValidator, async (req, res, next) => {
  const salesData = Array.isArray(req.body)
    ? req.body.map(({ productId, quantity }) => ({ productId, quantity }))
    : [{ productId: req.body.productId, quantity: req.body.quantity }];

  const newSales = await salesModel.create(salesData);

  res.status(201).send({
    message: 'Venda(s) criada(s) com sucesso!',
    createdSales: newSales,
  });
});

router.get('/', async (req, res, _next) => {
  const sales = await salesModel.getAll();

  if (sales.length === 0) {
    res.status(200).send({
      message: 'Não há vendas cadastradas ainda',
      sales,
    });
  }

  return res.status(200).send({ sales });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesModel.findById(id);

  if (!sale) {
    return next(boom.notFound('Venda não encontrada'));
  }

  return res.status(200).send({ sale });
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesModel.findById(id);

  if (!sale) {
    return next(boom.notFound('Venda não encontrada'));
  }

  await salesModel.remove(id);

  return res.status(200).send({
    message: 'Venda deletada com sucesso!',
    deletedSale: sale,
  });
});

router.put('/:id', salesValidator, async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesModel.findById(id);

  if (!sale) {
    return next(boom.notFound('Venda não encontrada'));
  }

  const { productId, quantity } = req.body;
  // const nameAlreadyExists = await salesModel.findByName(name, id);

  // if (nameAlreadyExists) {
  //   return next(boom.conflict('Recurso já existe', 'name'));
  // }

  const updatedSale = await salesModel.update(id, productId, quantity);

  res.status(200).send({
    message: 'Venda atualizada com sucesso!',
    updatedSale,
  });
});

module.exports = router;
