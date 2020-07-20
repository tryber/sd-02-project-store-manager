const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const validateJoi = async (reqInfo) =>
  schemasJoi.addSale.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const getAll = async (_req, res, next) => {
  const serviceAnswer = await salesService.getAllSales();
  if (serviceAnswer.error) next(serviceAnswer);
  res.status(200).json(serviceAnswer);
};

const createOne = rescue(async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const salesBody = req.body;
  console.log(salesBody);
  const idMapped = req.body.map(({ productId }) => productId);
  const isProductExists = await salesService.listOfExistProducts(idMapped);
  if (isProductExists.length) {
    return next({
      error: true,
      message: `The items: ${isProductExists} were not found. Sale insert was aborted.`,
      code: 'invalid_data',
    });
  }
  const serviceAnswer = await salesService.createOne(salesBody);
  res.status(201).json(serviceAnswer.ops);
});

const getById = async (req, res, next) => {
  const { id } = req.params;
  const serviceAnswer = await salesService.getSaleById(id);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const serviceAnswer = await salesService.deleteSaleById(id);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(204).end();
};

const updateById = rescue(async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const { id } = req.params;
  const salesBody = req.body;
  const idMapped = req.body.map(({ productId }) => productId);
  const isProductExists = await salesService.listOfExistProducts(idMapped);
  if (isProductExists.length) {
    return next({
      error: true,
      message: `The items: ${isProductExists} were not found. Sale update was aborted.`,
      code: 'invalid_data',
    });
  }
  const serviceAnswer = await salesService.updateSaleById(id, salesBody);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

module.exports = {
  getAll,
  createOne,
  getById,
  deleteById,
  updateById,
};
