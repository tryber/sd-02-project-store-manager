const express = require('express');
const productService = require('../services/productService');
const errorMessage = require('./errorMessages');

const router = express.Router();

const isDataValid = (name, quantity) => {
  const validName = name.length > 5 && typeof name === 'string';
  const validQuantity = quantity > 0 && Number.isInteger(quantity);
  if (validName && validQuantity) return true;
  return false;
};

router.get('/', async (_req, res) => {
  const products = await productService.listAllProducts();

  if (!products) return res.status(500).json({ message: 'Error loading products. Try again later.' });

  res.status(200).json(products);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const validData = isDataValid(name, quantity);

  if (!validData) {
    return res.status(400).json(errorMessage.invalidDataError);
  }

  try {
    const newProduct = await productService.createNewProduct({ name, quantity });

    if (newProduct.repeated) return res.status(400).json(errorMessage.repeatedName);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json(errorMessage.notFoundError);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json(errorMessage.notFoundError);
    }

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const validData = isDataValid(name, quantity);

  if (!validData) {
    return res.status(400).json(errorMessage.invalidDataError);
  }

  try {
    const updateProduct = await productService.updateProduct(id, { name, quantity });

    if (updateProduct.repeated) return res.status(400).json(errorMessage.repeatedName);

    if (!updateProduct) {
      return res.status(404).json(errorMessage.notFoundError);
    }

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(errorMessage.dbError);
  }
});

module.exports = router;
