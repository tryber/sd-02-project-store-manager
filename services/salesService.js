const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const existingProducts = async (sale) => {
  const mappedId = sale.map((id) => id.productId);
  const existingIds = await productModel.findByIds(mappedId);
  const missingProducts = mappedId.filter((id) => {
    const product = existingIds.find(({ _id }) => _id.equals(id));
    return !product;
  });
  return missingProducts;
};

const newSale = async (sale) => {
  const saleExist = await existingProducts(sale);
  if (saleExist.length) {
    const messageProducts = saleExist.join(', ');
    const err = {
      error: { message: `Items ${messageProducts} not found`, code: 'Invalid_data' } };
    throw err;
  }

  const createdSale = await salesModel.createSale(sale);
  return createdSale.ops;
};

const getAllSales = async () => {
  const all = await salesModel.getAllSales();
  return all;
};

const getSaleById = async (id) => {
  const sale = await salesModel.findSaleById(id);
  if (sale === null) {
    const err = { error: { message: 'Sale not found', code: 'Not_found' } };
    throw err;
  }
  return sale;
};

const deleteSaleById = async (id) => salesModel.deleteSaleById(id);

const updateSaleById = async (id, saleBody) => {
  const saleExist = await salesModel.findSaleById(id);
  if (saleExist === null) {
    const err = { error: { message: `Sorry, sale ${id} does not exist`, code: 'Not_found' } };
    throw err;
  }
  const productsExist = await existingProducts(saleBody);
  if (productsExist.length) {
    const messageProducts = productsExist.join(', ');
    const err = {
      error: { message: `Items ${messageProducts} not found`, code: 'Invalid_data' } };
    throw err;
  }
  const updatedSale = await salesModel.updateSaleById(id, saleBody);
  return updatedSale.value;
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  deleteSaleById,
  updateSaleById,
};
