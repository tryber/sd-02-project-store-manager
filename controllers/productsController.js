const express = require('express');

const router = express.Router();
const genericModel = require('../models/genericModel');
const services = require('../services');

router
  .get('/', async (_req, res) => {
    const results = await genericModel.findAll('products');
    if (!results) return res.status(204).json({ error: `Don't have products in db`, message: 'no_content' });
    return res.status(200).json({ products: [...results] });
  });

router
  .post('/', async (req, res) => {
    await services.validateProduct(req.body);
    const value = await genericModel.findBy('products', { name: req.body.name });
    if (value) {
      return res.status(409)
        .json({
          error: `${value.name} exists in db`,
          code: 'conflict'
        });
    }

    const { name, quantity } = req.body

    await genericModel.insert('products', { name, quantity });

    return res.status(201).json({
      message: 'Successfully Inserted',
      status: 'created'
    });
  })

module.exports = {
  router,
};
