const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

router.post('/products', (req, res) => {
  const { product } = req.body;
});

module.exports = router;