const productsService = require('../services/productsService');

async function create(req, res) {
  try {
    const product = await productsService.create(req.body);

    res.send(201).json({ product });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
};
