const salesService = require('../services/salesService');

const salesModel = require('../models/salesModel');

async function create(req, res) {
  try {
    const sale = await salesService.create(req.body);

    res.status(201).json({ sale });
  } catch (err) {
    throw err;
  }
}

async function list(_req, res) {
  try {
    const sales = await salesModel.list();

    res.status(200).json({ sales });
  } catch (err) {
    throw err;
  }
}

async function remove(req, res) {
  try {
    await salesService.remove(req.params.id);

    res.status(200).json({ message: 'Removed with sucess' });
  } catch (err) {
    throw err;
  }
}

async function find(req, res) {
  try {
    const sales = await salesService.find(req.params.id);

    res.status(200).json({ sales });
  } catch (err) {
    throw err;
  }
}

async function update(req, res) {
  try {
    const sale = await salesService.update({ id: req.params.id, body: req.body });

    res.status(200).json({ sale });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
  list,
  remove,
  update,
};
