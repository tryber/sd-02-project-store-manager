const Joi = require('@hapi/joi');
const { getOneProduct, postProduct, getProductFromParam, deleteProduct, updateProduct } = require('../models');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateId = async ({ id }) =>
  getOneProduct(id)
    .then((products) => ({ products }))
    .catch((error) => ({ error }));

const validProduct = async ({ name: testerName, quantity: testerQuantity }) => {
  try {
    const { name, quantity } = await schema.validateAsync({
      name: testerName,
      quantity: testerQuantity,
    });
    const exist = await getProductFromParam(name);
    if (exist) return { error: { message: 'name already registered', code: 'invalid_data' } };
    return postProduct(name, quantity)
      .then(({ ops }) => ({ register: ops[0] }))
      .catch((err) => ({ error: { message: err.message, code: 'internal_error' } }));
  } catch (err) {
    return { error: { message: err.message, code: 'invalid_data' } };
  }
};

const deleteFromId = async ({ id }) =>
  deleteProduct(id).catch((error) => ({ error }));

const updateAndValidProduct = async ({ id, name: testerName, quantity: testerQuantity }) => {
  try {
    const { name, quantity } = await schema.validateAsync({
      name: testerName,
      quantity: testerQuantity,
    });
    const exist = await getProductFromParam(name);
    if (exist) return { error: { message: 'name already registered', code: 'invalid_data' } };
    return updateProduct(id, name, quantity)
      .catch((err) => ({ error: { message: err.message, code: 'internal_error' } }));
  } catch (err) {
    return { error: { message: err.message, code: 'invalid_data' } };
  }
};

module.exports = { validateId, validProduct, deleteFromId, updateAndValidProduct };
