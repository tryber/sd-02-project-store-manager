const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const validateNewProduct = require('../middlewares/validate');

const newSale = rescue(async (req, res, next) => {
  const saleBody = req.body;
  await validateNewProduct.validateSales(saleBody);
  const serviceSale = await salesService.newSale(saleBody);
  if (serviceSale.error) next(serviceSale);
  return res.status(201).json(serviceSale);
});

const getAllSales = rescue(async (req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json(sales);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  return res.status(200).json(sale);
});

const deleteSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  await salesService.deleteSaleById(id);
  return res.status(204).end();
});

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  deleteSaleById,
};
