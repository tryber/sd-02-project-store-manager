const productsService = require('../services/productsService');

const productsModel = require('../models/productsModels');

async function create(req, res) {
  try {
    const product = await productsService.create(req.body);

    res.status(201).json({ product });
  } catch (err) {
    throw err;
  }
}

async function find(req, res) {
  try {
    const product = await productsService.find(req.params.id);

    res.status(200).json({ product });
  } catch (err) {
    throw err;
  }
}

async function list(_req, res) {
  try {
    const product = await productsModel.list();

    res.status(200).json({ product });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
  list,
};
