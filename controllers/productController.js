const productsService = require('../services/productsService');

async function create(req, res) {
  try {
    const product = await productsService.create(req.body);

    res.send(201).json({ product });
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  create,
};
