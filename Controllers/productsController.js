const express = require('express');
const productsModel = require('../Models/productsModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { dataIsValid, data } = await productsModel.validateData(req.body);

  if (!dataIsValid) {
    return res.status(422).send({
      error: {
        message: 'Dados inválidos',
        code: 'invalid_data',
        data,
      },
    });
  }

  const { name, quantity } = req.body;
  const newProduct = await productsModel.create(name, quantity);

  res.status(201).send({
    message: 'Produto criado com sucesso!',
    createdProduct: newProduct,
  });
});

router.get('/', async (req, res) => {
  const products = await productsModel.getAll();

  if (products.length === 0) {
    res.status(200).send({
      message: 'Não há produtos cadastrados ainda',
      products,
    });
  }

  return res.status(200).send({ products });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productsModel.findById(id);

  if (!product) {
    return res.status(404).send({
      error: {
        message: 'Produto não encontrado',
        code: 'not_found',
      },
    });
  }

  return res.status(200).send({ product });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productsModel.findById(id);

  if (!product) {
    return res.status(404).send({
      error: {
        message: 'Produto não encontrado',
        code: 'not_found',
      },
    });
  }

  await productsModel.remove(id);

  return res.status(200).send({
    message: 'Produto deletado com sucesso!',
    deletedProduct: product,
  });
});

module.exports = router;
