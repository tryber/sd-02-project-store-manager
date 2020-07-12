const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const validateJoi = async (reqInfo) =>
  schemasJoi.addSale.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAllSales();
    res.status(200).json(sales);
  } catch (fail) {
    next(
      { error: true, message: `${fail.message}`, code: 'internal_error' },
    );
  }
};

const createOne = async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const idMapped = req.body.map(({ productId }) => productId);
  const isProductExists = await salesService.listOfExistProducts(idMapped);
  if (isProductExists.length) {
    return next({
      error: true,
      message: `The items: ${isProductExists} were not found. Inserting of all sales was aborted.`,
      code: 'invalid_data',
    });
  }
  const serviceAnswer = await salesModel.createOne(req.body);
  res.status(201).json(serviceAnswer.ops);
};

module.exports = {
  getAll,
  createOne,
};
