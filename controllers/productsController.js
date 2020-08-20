const express = require('express');

const router = express.Router();
const genericModel = require('../models/genericModel');

router
  .get('/', async (req, res) => {
    const results = genericModel.findAll('products');
    return res.status(200).json({ ...results })
  });

router
  .post('/', async (req, res) => {
    const value = await genericModel.findBy('products', { name: req.body.name });
    if (value) return res.status(409)
      .json({
        error: `${value.name} exists in db`,
        code: 'conflict'
      });

    const { name, quantity } = req.body
    await genericModel.insert('products', { name, quantity });

    return res.status(200).json({
      message: 'Successfully Inserted',
      status: 'success'
    });
  })

module.exports = {
  router,
};
