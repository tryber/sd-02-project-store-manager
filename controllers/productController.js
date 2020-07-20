const productService = require('../services/productService');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const validateJoi = async (reqInfo) =>
  schemasJoi.addProduct.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const getAll = async (_req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (fail) {
    return next(
      { error: true, message: `${fail.message}`, code: 'internal_error' },
    );
  }
};

const createOne = async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const { name, quantity } = req.body;
  const serviceAnswer = await productService.createOne(name, quantity);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(201).json(serviceAnswer);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const serviceAnswer = await productService.getProductById(id);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await productService.deleteProductById(id);
    res.status(204).end();
  } catch (fail) {
    return next(
      { error: true, message: `${fail.message}`, code: 'internal_error' },
    );
  }
};

const updateById = async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const { name, quantity } = req.body;
  const { id } = req.params;
  const serviceAnswer = await productService.updateProduct(id, name, quantity);
  if (serviceAnswer.error) return next(serviceAnswer);
  return res.status(200).json(serviceAnswer);
};

module.exports = {
  getAll,
  createOne,
  getById,
  deleteById,
  updateById,
};
