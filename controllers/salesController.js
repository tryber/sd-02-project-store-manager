const Sale = require('../models/Sale');
const rescue = require('express-rescue');
const schemaJoi = require('../services/schemasJoi');
const validator = require('../services/validator');
const { productUpdateStock } = require('../services/productQuantity');

const listSales = rescue(async (_req, res) => {
  const sales = await Sale.getAll();
  return res.status(200).json(sales);
});

const saleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await Sale.getById(id);
  if (!sale) {
    return Promise.reject({ error: {
      message: 'Venda não encontrada',
      code: 'not_found' },
    });
  }

  return res.status(200).json(sale);
});

const saleInsertMany = rescue(async (req, res) => {
  const sales = req.body;

  await validator.sales.isValidSchemaJoi(sales);
  await validator.sales.productIds(sales);
  await validator.sales.productStock(sales);

  const response = await Sale.insertMany(sales);
  productUpdateStock(sales);

  return res.status(201).json(response.ops);
});

const saleDeleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await Sale.deleteById(id);

  return res.status(200).json({ message: 'Venda deletada com sucesso!' });
});

const saleUpdateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  await schemaJoi.sales.validateAsync({ quantity });

  const response = await Sale.updateById(id, quantity);

  if (!response.matchedCount) {
    return Promise.reject({ error: {
      message: 'Venda não encontrada',
      code: 'not_found' },
    });
  }

  return res.status(200).json({ message: 'Venda atualizada com sucesso!' });
});

module.exports = {
  listSales,
  saleById,
  saleInsertMany,
  saleDeleteById,
  saleUpdateById,
};
