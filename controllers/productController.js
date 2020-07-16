const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// instalar express rescue

router.post('/', rescue((req, res) => {
  const { name, quantity } = req.body;
  if (!name || !quantity) {
    return res.status(422).json({ error: { message: 'dados inválidos', code: 'bad_data' } })
  }
  const newProduct = await productService.createProduct();
  return res.status(201).json(newProduct);
}));


module.exports = router;