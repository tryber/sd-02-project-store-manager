const express = require('express');
const genericModel = require('../models/genericModel');
const services = require('../services');

const router = express.Router();

router
  .get('/', async (_req, res) => {
    const results = await genericModel.findAll('products');
    if (!results.length) {
      return res.status(200).json({ message: 'Database is empty' });
    }
    return res.status(200).json({ products: [...results] });
  });

router
  .post('/', async (req, res) => {
    const joiVerify = services.validateProduct(req.body);
    if (joiVerify) return res.status(422).json({ error: joiVerify, code: 'bad_data' });

    const { name, quantity } = req.body;
    const value = await genericModel.findBy('products', { name });

    if (value) {
      return res.status(409)
        .json({
          error: `${value.name} exists in db`,
          code: 'conflict',
        });
    }

    await genericModel.insert('products', { name, quantity });

    return res.status(201).json({
      message: 'Successfully Inserted',
      status: 'created',
    });
  });

module.exports = {
  router,
};
