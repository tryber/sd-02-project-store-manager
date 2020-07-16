const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await productsService.getAllProducts;
  res.status(200).json({
    message: 'Produtos retornados',
    products,
  });
});

router.get('/:id', async (req, res) => {
  const product = await productsService.getProductById(`${req.params.id}`);

  if (!product) {
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados', code: 'db_connection_error' });
  }

  if (product.length === 0) {
    return res.status(404).json({ message: 'Produto não encontrado', code: 'not_found' });
  }

  return res.status(200).json({ message: 'Produto Encontrado', product: [product] });
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const isValid = await productsService.validateProducts(name, quantity);
  if (isValid.error) {
    return res.status(422).json({ message: isValid.error, code: isValid.code });
  }

  const isProductExists = await productsService.existProduct(name);

  if (isProductExists) return res.status(400).json({ message: 'Produto já existe', code: 'duplicated_product' });

  const isProductCreated = await productsService.createProducts({ name, quantity });

  if (!isProductCreated) {
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados', code: 'db_connection_error' });
  }

  return res.status(201).json({ message: 'Produto criado com sucesso' });
});

router.delete('/:id', async (req, res) => {
  const isProductExist = await productsService.getProductById(`${req.params.id}`);

  if (isProductExist.length === 0) return res.status(400).json({ message: 'Produto não encontrado', code: 'not_found' });

  const isRemoved = await productsService.deleteProductById(`${req.params.id}`);

  if (!isRemoved) {
    return res.status(500).json({ message: 'Erro de conexão com o banco de dados', code: 'db_connection_error' });
  }

  return res.status(200).json({ message: 'Produto removido', code: 'removed_product' });
});

module.exports = router;
