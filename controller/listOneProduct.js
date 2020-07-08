const { product } = require('../services');

const listOneProduct = async (req, res) => {
  const { products, message } = await product.validateId(req.params);
  if (message) return res.status(400).json({ message });
  if (products.length === 0) return res.status(404).json({ message: 'Produto não encontrado' });
  return res.status(200).json({ products });
};

module.exports = listOneProduct;
