const express = require('express');
const salesModel = require('../Models/salesModel');
const saleValidator = require('../Middlewares/saleValidator');
const boom = require('boom');

const router = express.Router();

router.post('/', saleValidator, async (req, res, next) => {
  const salesData = req.body.map(({ productId, quantity }) => ({ productId, quantity }));

  const newSales = await salesModel.create(salesData);

  res.status(201).send({
    message: 'Vendas criadas com sucesso!',
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

// router.delete('/:id', async (req, res, next) => {
//   const { id } = req.params;

//   const product = await salesModel.findById(id);

//   if (!product) {
//     return next(boom.notFound('Recurso não encontrado'));
//   }

//   await salesModel.remove(id);

//   return res.status(200).send({
//     message: 'Produto deletado com sucesso!',
//     deletedSale: product,
//   });
// });

// router.put('/:id', productValidator, async (req, res, next) => {
//   const { id } = req.params;

//   const product = await salesModel.findById(id);

//   if (!product) {
//     return next(boom.notFound('Recurso não encontrado'));
//   }

//   const { name, quantity } = req.body;
//   const nameAlreadyExists = await salesModel.findByName(name, id);

//   if (nameAlreadyExists) {
//     return next(boom.conflict('Recurso já existe', 'name'));
//   }

//   const updatedSale = await salesModel.update(id, name, quantity);

//   res.status(200).send({
//     message: 'Produto atualizado com sucesso!',
//     updatedSale,
//   });
// });

module.exports = router;
