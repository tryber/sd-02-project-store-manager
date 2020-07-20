const Joi = require('@hapi/joi/');

const addProduct = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required()
    .strict(),
});

const addSale = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
    .strict(),
});

module.exports = {
  addProduct,
  addSale,
};
