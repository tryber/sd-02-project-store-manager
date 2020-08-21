const express = require('express');

const router = express.Router();
const genericModel = require('../models/genericModel');
const services = require('../services');

router
  .get('/', async (_req, res) => {
    const results = await genericModel.findAll('products');
    if (!results) {
      return res.status(204).json({ error: "Don\'t have products in db", message: 'no_content' });
    }
    return res.status(200).json({ products: [...results] });
  });

router
  .post('/', async (req, res) => {
    const { name, quantity } = req.body;

    if (!name || !quantity) return res.status(406).json({ error: 'Não há dados', code: 'bad_data' });

    await services.validateProduct(req.body);
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
