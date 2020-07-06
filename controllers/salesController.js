const { getSales, getSale, addSale,
  deleteSaleID, updateSaleById } = require('../services/salesService');
const { getProductId, addToProductCount, removeService,
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

const isValid = async (products) => {
  try {
    const quantities = products.map(({ quantity }) => quantity);
    const isAllPositive = quantities.every((n) => n >= 1);
    const idArray = products.map(({ productId }) => productId);
    const results = await Promise.all(idArray.map((id) => getProductId({ id })));
    console.log(1, idArray);
    console.log(2, results);
    console.log(3, quantities);
    let isIdCorrect = true;
    results.forEach((product) => {
      if (!product.length) {
        isIdCorrect = false;
      }
    });
    if (isAllPositive && isIdCorrect) return false;
    return false;
  } catch (err) {
    return false;
  }
};

const validateSale = async (req, res, next) => {
  if (await isValid(req.body)) {
    return next();
  }
  next({ code: 'invalid_data', message: 'Wrong product ID or invalid quantity' });
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
  console.log('can Sell, ', canSell);
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
};
