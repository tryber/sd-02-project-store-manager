const productsService = require('../services/productsService');

async function create(req, res) {
  try {
    await productsService.erro1(true);

    await productsService.erro2(false);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  create,
};
