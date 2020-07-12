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

  res.status(200).send({
    message: 'Produto criado com sucesso!',
    newProduct,
  });
});

module.exports = router;
