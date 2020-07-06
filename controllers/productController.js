// const rescue = require('express-rescue');
// const Joi = require('@hapi/joi');
const productModel = require('../models/productModel');
const schemasJoi = require('../services/schemasJoi');
const errorJoi = require('../services/errorJoi');

const getAll = async (_req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (fail) {
    res.status(500).json({
      error: { message: `internal_error: ${fail.message}`, code: 'internal_error' },
    });
  }
};

const createOne = async (req, res) => {
  const { name, quantity } = req.body;
  const isUnique = await productModel.getProductByName(name);
  if (isUnique !== null) {
    return res.status(400).json({
      error: { message: 'This product already exists', code: 'alredy_exists' },
    });
  }
  try {
    await schemasJoi.addProduct.validateAsync({ name, quantity });
  } catch (fail) {
    return res.status(422).json(errorJoi(fail));
  }
  await productModel.createOneProduct({ name, quantity });
  res.status(201).json(req.body);
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(id);
    if (product === null) {
      return res.status(404).json({
        error: { message: 'No product was found with the ID provided', code: 'not_found' },
      });
    }
    res.status(200).json(product);
  } catch (fail) {
    res.status(500).json({
      error: { message: `${fail.message}`, code: 'internal_error' },
    });
  }
};

module.exports = {
  getAll,
  createOne,
  getById,
};
