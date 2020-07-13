const { getAllProducts, validateProducts } = require('../services/productsService');

const getProducts = async (req, res) => {
  const products = await getAllProducts;
  res.status(200).json({
    message: 'Produtos retornados',
    products,
  });
};

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const isValid = await validateProducts(name, quantity);
  if (isValid.error) {
    return res.status(422).json({ message: isValid.error, code: isValid.code });
  }
  return res.status(201).json({ message: 'Produto criado com sucesso' });
};

module.exports = {
  getProducts,
  insertProduct,
};
