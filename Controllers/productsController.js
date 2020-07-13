const express = require('express');
const productsModel = require('../Models/productsModel');
const productValidator = require('../Middlewares/productValidator');
const boom = require('boom');

const router = express.Router();

router.post('/', productValidator, async (req, res, next) => {
  const { name, quantity } = req.body;

  const nameAlreadyExists = await productsModel.findByName(name);
  if (nameAlreadyExists) {
    return next(boom.conflict('Recurso já existe', 'name'));
  }

  const newProduct = await productsModel.create(name, quantity);

  res.status(201).send({
    message: 'Produto criado com sucesso!',
    createdProduct: newProduct,
  });
});

router.get('/', async (req, res, next) => {
  const products = await productsModel.getAll();

  if (products.length === 0) {
    res.status(200).send({
      message: 'Não há produtos cadastrados ainda',
      products,
    });
  }

  return res.status(200).send({ products });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const product = await productsModel.findById(id);

  if (!product) {
    return next(boom.notFound('Recurso não encontrado'));
  }

  return res.status(200).send({ product });
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  const product = await productsModel.findById(id);

  if (!product) {
    return next(boom.notFound('Recurso não encontrado'));
  }

  await productsModel.remove(id);

  return res.status(200).send({
    message: 'Produto deletado com sucesso!',
    deletedProduct: product,
  });
});

router.put('/:id', productValidator, async (req, res, next) => {
  const { id } = req.params;

  const product = await productsModel.findById(id);

  if (!product) {
    return next(boom.notFound('Recurso não encontrado'));
  }

//   const { dataIsValid, data } = await productsModel.validateData(req.body);

//   if (!dataIsValid) {
//     return res.status(422).send({
//       error: {
//         message: 'Dados inválidos',
//         code: 'invalid_data',
//         data,
//       },
//     });
//   }

  const { name, quantity } = req.body;
  const nameAlreadyExists = await productsModel.findByName(name, id);

  if (nameAlreadyExists) {
    return next(boom.conflict('Recurso já existe', 'name'));
  }

  const updatedProduct = await productsModel.update(id, name, quantity);

  res.status(200).send({
    message: 'Produto atualizado com sucesso!',
    updatedProduct,
  });
});

module.exports = router;
