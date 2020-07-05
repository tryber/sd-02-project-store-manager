const rescue = require('express-rescue');
const { getSales, getSale } = require('../services/salesService');

const getAllSales = async (req, res) => {
  const sales = await getSales();
  res.status(200).json({
    sales,
  });
};

const getSaleById = rescue(async (req, res, next) => {
  const sale = await getSale(req.params);
  if (sale.length) {
    return res.status(200).json({
      ...sale[0],
    });
  }
  return next({ code: 'not_found', message: 'Sale not found' });
});

module.exports = {
  getAllSales,
  getSaleById,
};
