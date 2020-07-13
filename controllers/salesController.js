const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const validateJoi = async (reqInfo) =>
  schemasJoi.addSale.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const getAll = async (_req, res, next) => {
  const serviceAnswer = await salesService.getAllSales();
  if (serviceAnswer.error) next(serviceAnswer);
  res.status(200).json(serviceAnswer);
};

const createMany = async (req, res, next) => {
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
  const serviceAnswer = await salesService.createMany(req.body);
  res.status(201).json(serviceAnswer.ops);
};

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

const updateById = async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const serviceAnswer = await salesService.updateSaleById(id, productId, quantity);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
};

module.exports = {
  getAll,
  createMany,
  getById,
  deleteById,
  updateById,
};
