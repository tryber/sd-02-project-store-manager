const productsService = require('../services/productsService');

async function create(req, res) {
  try {
    await productsService.create(false);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  create,
};
