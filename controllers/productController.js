const express = require('express');
const router = express.Router();
// const rescue = require('express-rescue');
const productService = require('../services/productService');

// instalar express rescue

router.post('/', async (req, res) => {
  console.log(req.body);
  const { name, quantity } = req.body;
  if (!name || !quantity) {
    return res.status(422).json({ error: { message: 'dados inválidos', code: 'bad_data' } })
  } // lembrar de retirar isso daqui para criar uma função autônoma. Ver erxpress-rescue ou outra biblioteca de validação
  const newProduct = await productService.createProduct(name, quantity);
  return res.status(201).json(newProduct);
});


module.exports = router;