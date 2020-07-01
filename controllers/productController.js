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

  const validName = name.length > 5 && typeof name === 'string';
  const validQuantity = quantity > 0 && Number.isInteger(quantity);

  if (!validName || !validQuantity) {
    return res.status(400).json({
      error: {
        message: 'Invalid data',
        code: 'invalid_data',
        data: 'The product name must be at least 5 letters and be a string. The quantity must be at least 1 an be an interger.',
      },
    });
  }

  try {
    const newProduct = await productService.createNewProduct({ name, quantity });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error when connecting with database',
        code: 'db_connection_err',
        data: err,
      },
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error when connecting with database',
        code: 'db_connection_err',
        data: err,
      },
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteSingleProduct(id);
    if (!deletedProduct) {
      return res.status(400).json({
        error: {
          message: 'Product not found.',
          code: 'not_found',
        },
      });
    }

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error when connecting with database',
        code: 'db_connection_err',
        data: err,
      },
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
