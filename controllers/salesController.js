const Sales = require('../models/salesModel');
const rescue = require('express-rescue');
const schemaJoi = require('../models/schemasJoi');
const validator = require('../services/validator');


const listSales = rescue(async (_req, res) => {
  const sales = await Sales.getAll();
  return res.status(200).json(sales);
});

const saleById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await Sales.getById(id);
  if (!sale) {
    return res.status(404).json({ message: 'Venda não encontrada' });
  }

  return res.status(200).json(sale);
});

const saleInsertMany = rescue(async (req, res) => {
  const sales = req.body;

  try {
    await validator.sales.isValidSchemaJoi(sales);
    await validator.sales.productIds(sales);
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }
  const response = await Sales.insertMany(sales);

  return res.status(201).json(response.ops);
});

const saleDeleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await Sales.deleteById(id);

  return res.status(200).json({ message: 'Venda deletada com sucesso!' });
});

const saleUpdateById = rescue(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    await schemaJoi.sales.validateAsync({ quantity });
  } catch (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const response = await Sales.updateById(id, quantity);

  if (!response.matchedCount) {
    return res.status(404).json({ message: 'Venda não encontrada' });
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
