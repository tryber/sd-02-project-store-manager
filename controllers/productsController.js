const { getAllProducts } = require('../services/productsService');

const getProducts = async (req, res) => {
  const products = await getAllProducts;
  res.status(200).json({
    message: 'Produtos retornados',
    products,
  });
};

module.exports = {
  getProducts,
};
