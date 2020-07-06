const { getSales, getSale, addSale, isValidNewSale, isValid,
  deleteSaleID, updateSaleById } = require('../services/salesService');
const { addToProductCount, removeService,
  serviceStockChecker } = require('../services/productsService');

const getAllSales = async (req, res) => {
  const sales = await getSales();
  res.status(200).json({
    sales,
  });
};

const getSaleById = async (req, res, next) => {
  try {
    const sale = await getSale(req.params);
    if (sale.length) {
      return res.status(200).json({
        ...sale[0],
      });
    }
    next({ code: 'not_found', message: 'Sale not found' });
  } catch (_err) {
    next({ code: 'invalid_data', message: 'Wrong ID format' });
  }
};

const validateNewSale = async (req, res, next) => {
  if (await isValidNewSale(req.body)) {
    return next();
  }
  next({ code: 'invalid_data', message: 'Wrong product ID or invalid quantity' });
};

const validateSale = async (req, _res, next) => {
  const info = await isValid(req.body, req.params.id);
  if (!info || info.shouldNotUpdate.length) {
    return next({ code: 'invalid_data', message: 'Wrong product ID or invalid quantity' });
  }
  const mappedAdd = [];
  const mappedRemove = [];
  info.actions.forEach(({ id, willAddToCount, quantity }) => {
    if (willAddToCount) mappedAdd.push({ productId: id, quantity });
  });
  info.actions.forEach(({ id, willDecToCount, quantity }) => {
    if (willDecToCount) mappedRemove.push({ productId: id, quantity });
  });
  await addToProductCount(mappedAdd);
  await removeService(mappedRemove);
  return next();
};

const createSale = async (req, res) => {
  const addedItem = await addSale(req.body);
  await removeService(req.body);
  return res.status(200).json(...addedItem);
};

const deleteSale = async (req, res) => {
  const saleDeleted = await deleteSaleID(req.params);
  await addToProductCount(saleDeleted[0].itensSold);
  return res.status(200).json({
    ...saleDeleted[0],
  });
};

const updateSale = async (req, res) => {
  const saleUpdated = await updateSaleById(req.params, req.body);
  return res.status(200).json({
    ...saleUpdated[0],
  });
};

const checkSaleId = async (req, res, next) => {
  try {
    const sale = await getSale(req.params);
    if (sale.length) {
      return next();
    }
    next({ code: 'not_found', message: 'Sale not found' });
  } catch (error) {
    next({ code: 'invalid_data', message: 'Wrong sale ID format' });
  }
};

const checkStock = async (req, res, next) => {
  const canSell = await serviceStockChecker(req.body);
  if (canSell) {
    return next();
  }
  return next({ code: 'stock_problem', message: 'Such amount is not permitted to sell' });
};

module.exports = {
  getAllSales,
  getSaleById,
  validateSale,
  createSale,
  deleteSale,
  checkSaleId,
  updateSale,
  checkStock,
  validateNewSale,
};
