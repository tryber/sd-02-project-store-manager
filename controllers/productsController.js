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
    return res.status(200).json({ status: "success", products: [...results] });
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

    const dbLastId = await genericModel.getLastId('products') || {};
    const lastIdObj = dbLastId[0] || {};
    const newId = lastIdObj._id + 1 || 1;

    await genericModel.insert('products', { _id: newId, name, quantity });

    return res.status(201).json({
      message: 'Successfully Inserted',
      status: 'created',
    });
  });

router
  .get('/:id', async (req, res) => {
    const idObj = { _id: Number(req.params.id) };
    const dbResponse = await genericModel.getById('products', idObj);

    if (!dbResponse) return res.status(404).json({ error: 'product not Found', code: 'not_found' });

    const { _id, ...data } = dbResponse;

    return res.status(200).json({ ...data });
  });

router
  .delete('/:id', async (req, res) => {
    const docExists = await genericModel.getById('products', { _id: Number(req.params.id) });

    if (!docExists) return res.status(404).json({ error: 'product not Found', code: 'not_found' });

    await genericModel.deleteById('products', docExists);

    return res.status(200).json({ message: 'product deleted', code: 'success' });
  });

router
  .patch('/:id', async (req, res) => {
    const id = req.params.id;
    const isValid = services.validateProduct(req.body)

    if (isValid) return res.status(422).json({ error: isValid, code: 'bad_data' });

    const isExists = await genericModel.getById('products', { _id: Number(id) });

    if (!isExists) return res.status(404).json({ error: 'product not exists', code: 'not_found' });

    const { name, quantity } = req.body;
    await genericModel.updateOne('products', isExists, { name, quantity });

    return res.status(200).json({ message: 'updated success', code: 'success' })
  });

module.exports = {
  router,
};
