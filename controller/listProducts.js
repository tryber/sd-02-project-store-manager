const { getAllProducts } = require('../models');

const listProducts = async (_req, res) => {
  const products = await getAllProducts();
  res.status(200).json({ products });
};

module.exports = listProducts;
