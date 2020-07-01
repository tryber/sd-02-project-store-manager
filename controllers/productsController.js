const { getProducts } = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const products = await getProducts();
  res.status(200).json({
    products,
  })
};

module.exports = {
  getAllProducts,
};
