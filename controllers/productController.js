const productService = require('../services/productService');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const objError = {
  not_found: 404,
  already_exists: 409,
  exists_with_another_id: 409,
};

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (fail) {
    res.status(500).json({
      error: {
        error: true,
        message: `internal_error: ${fail.message}`,
        code: 'internal_error',
      },
    });
  }
};

const createOne = async (req, res) => {
  try {
    await schemasJoi.addProduct.validateAsync(req.body);
  } catch (fail) {
    return res.status(422).json(errorJoi(fail));
  }
  const { name, quantity } = req.body;
  const serviceAnswer = await productService.createOne(name, quantity);
  if (serviceAnswer.error) {
    const statusCode = objError[serviceAnswer.code] || 500;
    return res.status(statusCode).json({
      error: {
        error: true,
        message: serviceAnswer.message,
        code: serviceAnswer.code,
      },
    });
  }
  res.status(201).json(serviceAnswer);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const serviceAnswer = await productService.getProductById(id);
  if (serviceAnswer.error) {
    const statusCode = objError[serviceAnswer.code] || 500;
    return res.status(statusCode).json({
      error: { message: serviceAnswer.message, code: serviceAnswer.code },
    });
  }
  res.status(200).json(serviceAnswer);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await productService.deleteProduct(id);
    res.status(204).end();
  } catch (fail) {
    res.status(500).json({
      error: { message: `${fail.message}`, code: 'internal_error' },
    });
  }
};

const updateById = async (req, res) => {
  try {
    await schemasJoi.addProduct.validateAsync(req.body);
  } catch (fail) {
    return res.status(422).json(errorJoi(fail));
  }
  const { name, quantity } = req.body;
  const { id } = req.params;
  const serviceAnswer = await productService.updateProduct(id, name, quantity);
  if (serviceAnswer.error) {
    const statusCode = objError[serviceAnswer.code] || 500;
    return res.status(statusCode).json({
      error: { message: serviceAnswer.message, code: serviceAnswer.code },
    });
  }
  return res.status(200).json(serviceAnswer);
};

module.exports = {
  getAll,
  createOne,
  getById,
  deleteById,
  updateById,
};
