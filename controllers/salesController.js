const express = require('express');
const genericModel = require('../models/genericModel');
const services = require('../services');

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

    const { productId, quantity } = req.body;
    const productExists = await genericModel.getById('products', { _id: Number(productId) });

    if (!productExists || productExists.quantity < quantity) {
      return res.status(403)
        .json({
          error: 'Product not found or quantity out of stock ',
          code: 'forbidden',
        });
    }

    const dbLastId = await genericModel.getLastId('sales') || {};
    const lastIdObj = dbLastId[0] || {};
    const newId = lastIdObj._id + 1 || 1;

    const toReturnAPI = { _id: newId, ...req.body };

    const newQuantity = productExists.quantity - quantity;

    await genericModel.insert('sales', toReturnAPI);
    await genericModel.getById('products', { _id: Number(productId) })
    await genericModel.updateOne('products', { _id: productId }, { quantity: newQuantity });

    return res.status(201).json({ message: 'Sale successfully registered', sale: { ...toReturnAPI } });
  });

router
  .put('/:id', async (req, res) => {
    const id = req.params.id;
    const isValid = services.validateSales(req.body);

    if (isValid) return res.status(422).json({ error: isValid, code: 'bad_data' });

    const saleExists = await genericModel.getById('sales', { _id: Number(id) });

    if (!saleExists) return res.status(404).json({ error: 'sale not exists', code: 'not_found' });

    const { productId, quantity } = req.body;
    const productExists = await genericModel.getById('products', { _id: productId });
    const sumQuantity = productExists.quantity + saleExists.quantity;

    if (!productExists || sumQuantity < quantity) {
      return res.status(403).json({
        error: 'product not exists or quantity out of stock',
        code: 'not_found',
      });
    }

    const newQuantity = sumQuantity - quantity;

    await genericModel.updateOne('products', { _id: productExists._id }, { quantity: newQuantity });
    await genericModel.updateOne('sales', saleExists, { productId, quantity });

    return res.status(200).json({ message: 'updated success', code: 'success' });
  });


router
  .delete('/:id', async (req, res) => {
    const saleExists = await genericModel.getById('sales', { _id: Number(req.params.id) });

    if (!saleExists) return res.status(404).json({ error: 'sale not Found', code: 'not_found' });

    const { _id, quantity } = await genericModel.getById('products', { _id: saleExists.productId });

    const actualQuantity = saleExists.quantity + quantity;

    await genericModel.updateOne('products', { _id }, { quantity: actualQuantity });
  
    await genericModel.deleteById('sales', saleExists);

    return res.status(200).json({ message: 'sale deleted', code: 'success' });
  });


module.exports = {
  router,
};
