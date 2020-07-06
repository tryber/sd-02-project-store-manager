const { getAllSales, saleById, addNewSale, deleteSaleByID,
  updateSale } = require('../models/salesModel.js');
const { getProductId } = require('./productsService');

const getSales = getAllSales;

const getSale = async ({ id }) => saleById(id);

const addSale = async (products) => addNewSale(products);

const deleteSaleID = async ({ id }) => deleteSaleByID(id);

const updateSaleById = async ({ id }, body) => updateSale(id, body);

const compareValue = (idArray, results, quantities, sales) => {
  const prevQtyInSale = idArray.map((id) => sales.filter((sale) => sale.productId === id));
  const newQtyInSale = idArray.map((id, i) => ({ id, quantity: quantities[i] }));
  const adjustedProducts = prevQtyInSale
    .map((elem, i) => ({
      id: elem[0].productId,
      prevQuantity: elem[0].quantity,
      updatedQuantity: newQtyInSale[i].quantity,
      stockQuantity: results[i][0].quantity,
    }));
  const shouldNotUpdate = [];
  const actions = adjustedProducts.map(({ id, prevQuantity, updatedQuantity, stockQuantity }) => {
    const willAddToCount = prevQuantity > updatedQuantity;
    const quantity = Math.abs(prevQuantity - updatedQuantity);
    const willDecToCount = (prevQuantity < updatedQuantity) && (quantity <= stockQuantity);
    if ((prevQuantity < updatedQuantity) && (quantity > stockQuantity)) shouldNotUpdate.push(id);
    return { id, willAddToCount, quantity, willDecToCount };
  });
  return { shouldNotUpdate, actions };
};

const isValid = async (products, saleId) => {
  try {
    const quantities = products.map(({ quantity }) => quantity);
    const isAllPositive = quantities.every((n) => n >= 1);
    const idArray = products.map(({ productId }) => productId);
    const sales = [...await getSale({ id: saleId })][0].itensSold;
    const results = await Promise.all(idArray.map((id) => getProductId({ id })));
    let isIdCorrect = true;
    results.forEach((product) => {
      if (!product.length) {
        isIdCorrect = false;
      }
    });
    const info = compareValue(idArray, results, quantities, sales);
    if (info.shouldNotUpdate.length) return false;
    if (isAllPositive && isIdCorrect) return info;
    return false;
  } catch (err) {
    return false;
  }
};

const isValidNewSale = async (products) => {
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
    if (isAllPositive && isIdCorrect) return false;
    return false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getSales,
  getSale,
  addSale,
  deleteSaleID,
  updateSaleById,
  isValidNewSale,
  isValid,
};
