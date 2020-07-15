const Sale = require('../models/Sale');
const rescue = require('express-rescue');
const schemaJoi = require('../services/schemasJoi');
const validator = require('../services/validator');


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

const saleInsert = rescue(async (req, res) => {
  const sale = req.body;

  await schemaJoi.sales.validateAsync(sale);

  await validator.sales.productIds(sale);
  await validator.sales.productStock(sale);

  const newSale = new Sale(sale);
  const result = await newSale.add();

  return res.status(201).json(result.ops[0]);
});

const saleDeleteById = rescue(async (req, res) => {
  const { id } = req.params;
  await Sale.deleteById(id);

  return res.status(200).json({ message: 'Venda deletada com sucesso!' });
});

const saleUpdateById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  await schemaJoi.sales.validateAsync(sale);

  const newSale = new Sale(sale);

  const response = await newSale.updateById(id);

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
  saleInsert,
  saleDeleteById,
  saleUpdateById,
};
