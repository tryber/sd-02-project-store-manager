const { getSales, getSale, addSale, deleteSaleID } = require('../services/salesService');
const { getProductId } = require('../services/productsService');

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
    const isAllPositive = products.map(({ quantity }) => quantity).every((n) => n >= 1);
    const idArray = products.map(({ productId }) => productId);
    const results = await Promise.all(idArray.map((id) => getProductId({ id })));
    let isIdCorrect = true;
    results.forEach((product) => {
      if (!product.length) {
        isIdCorrect = false;
      }
    });
    if (isAllPositive && isIdCorrect) return true;
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
  console.log(addedItem);
  return res.status(200).json(...addedItem);
};

const deleteSale = async (req, res, next) => {
  try {
    const saleDeleted = await deleteSaleID(req.params);
    if (saleDeleted.length) {
      return res.status(200).json({
        ...saleDeleted[0],
      });
    }
    next({ code: 'not_found', message: 'Sale not found' });
  } catch (error) {
    next({ code: 'invalid_data', message: 'Wrong ID format' });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  validateSale,
  createSale,
  deleteSale,
};
