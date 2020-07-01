const { getSales } = require('../services/salesService');

const getAllSales = async (req, res) => {
  const sales = await getSales();
  res.status(200).json({
    sales,
  })
};

module.exports = {
  getAllSales,
};
