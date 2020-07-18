const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const newSale = async (sale) => {
  const mapId = sale.map((id) => id.productId);
  const existingProducts = await productModel.findByIds(mapId);
  const missingProducts = mapId.filter((id) => {
    const product = existingProducts.find(({ _id }) => _id.equals(id))
    return !product;
  });

  if (missingProducts.length) {
    const messageProducts = missingProducts.join(', ')
    const err = {
      error: { message: `The items ${messageProducts} not found`, code: 'Invalid_data' } };
    throw err;
  }

  const createdSale = await salesModel.createSale(sale);
  return createdSale.ops;
};

const getAllSales = async () => {
  const all = await salesModel.getAllSales();
  return all;
};

module.exports = {
  newSale,
  getAllSales,
};
