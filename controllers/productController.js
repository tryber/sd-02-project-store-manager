const express = require('express');
const productService = require('../services/productService');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await productService.listAllProducts();

  if (!products) return res.status(500).json({ message: 'Error loading products. Try again later.' });

  res.status(200).json(products);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  if (name.length <= 5 || typeof name !== 'string' || quantity < 1) {
    return res.status(400).json({
      error: {
        message: 'Invalid data',
        code: 'invalid_data',
        data: 'The product name must be at least 5 letters and be a string. The quantity must be at least 1.',
      },
    });
  }

  try {
    const newProduct = await productService.createNewProduct({ name, quantity });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Something went wrong when registering the product. Try again later.',
        code: 'create_err',
        data: err,
      },
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.showSingleProduct(id);

  if (!product) {
    return res.status(400).json({
      error: {
        message: 'Product not found.',
        code: 'not_found',
      },
    });
  }

  res.status(200).json(product);
});

router.delete('/:id', async (req, res) => {
  try {
    const products = await new ProductModel().delete(req.params.id);

    res.status(200).json(products);
  } catch (_e) {
    res.status(500).json({
      message: 'Something went wrong when deleting the product. Try again later.',
    });
  }
});

router.put('/:id', async (req, res) => {
  const { name, brand } = req.body;

  try {
    const products = await new ProductModel(name, brand).update(req.params.id);

    res.status(200).json(products);
  } catch (_e) {
    res.status(500).json({
      message: 'Something went wrong when updating the product. Try again later.',
    });
  }
});

module.exports = router;
