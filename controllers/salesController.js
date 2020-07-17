const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const validateNewProduct = require('../middlewares/validate');

const newSale = rescue(async (req, res, next) => {
  const saleBody = req.body;
  const isValid = await validateNewProduct.validateSales(saleBody);
  if (isValid.error) return next(isValid);
  const serviceSale = await salesService.newSale(saleBody);
  if (serviceSale.error) next(serviceSale);
  return res.status(201).json(serviceSale);
});

module.exports = {
  newSale,
};
