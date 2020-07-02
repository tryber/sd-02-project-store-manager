const express = require('express');
const productService = require('../services/productService');

const router = express.Router();

const dbError = {
  error: {
    message: 'Error when connecting with database',
    code: 'db_connection_err',
  },
};

const notFoundError = {
  error: {
    message: 'Product not found.',
    code: 'not_found',
  },
};

const repeatedName = {
  error: {
    message: 'Name already exists',
    code: 'repetead_name',
  },
};

const invalidDataError = {
  error: {
    message: 'Invalid data',
    code: 'invalid_data',
    data: 'The product name must be at least 5 letters and be a string. The quantity must be at least 1 an be an interger.',
  },
};

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
    return res.status(400).json(invalidDataError);
  }

  try {
    const newProduct = await productService.createNewProduct({ name, quantity });

    if (newProduct.repeated) return res.status(400).json(repeatedName);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(dbError);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json(notFoundError);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(dbError);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json(notFoundError);
    }

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json(dbError);
  }
});

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const validData = isDataValid(name, quantity);

  if (!validData) {
    return res.status(400).json(invalidDataError);
  }

  try {
    const updateProduct = await productService.updateProduct(id, { name, quantity });

    if (updateProduct.repeated) return res.status(400).json(repeatedName);

    if (!updateProduct) {
      return res.status(404).json(notFoundError);
    }

    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(dbError);
  }
});

module.exports = router;
