const express = require('express');
const genericModel = require('../models/genericModel');
const services = require('../services');
const { product } = require('../services/schema');

const router = express.Router();


router
  .get('/', async (_req, res) => {
    const sales = await genericModel.findAll('sales');
    if (!sales.length) {
      return res.status(200).json({ message: 'No Sales', status: 'success' });
    }
    return res.status(200).json({ status: "success", sales: [...sales] });
  });

router
  .get('/:id', async (req, res) => {
    const saleId = { _id: Number(req.params.id) };
    const dbSales = await genericModel.getById('sales', saleId);

    if (!dbSales) return res.status(404).json({ error: 'sale not Found', code: 'not_found' });

    const { _id, ...data } = dbSales;

    return res.status(200).json({ ...data });
  });

router
  .post('/', async (req, res) => {
    const joiVerify = services.validateSales(req.body);
    if (joiVerify) return res.status(422).json({ error: joiVerify, code: 'bad_data' });

    const { productId } = req.body;
    const productExists = await genericModel.getById('products', { _id: Number(productId) });

    if (!productExists) {
      return res.status(404)
        .json({
          error: `Product with ProductID ${productId} not exists in db`,
          code: 'not_found',
        });
    }

    const dbLastId = await genericModel.getLastId('sales') || {};
    const lastIdObj = dbLastId[0] || {};
    const newId = lastIdObj._id + 1 || 1;

    const toReturnAPI = { _id: newId, ...req.body };

    await genericModel.insert('sales', toReturnAPI);

    return res.status(201).json({ message: 'Sale successfully registered', sale: { ...toReturnAPI } });
  });
/*
router
  .patch('/', async (req, res) => {

  });
*//*
router
  .delete('/:id', async (req, res) => {

  });
*/

module.exports = {
  router,
};
