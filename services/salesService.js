const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const newSale = async (sale) => {

  const mapId = sale.map((id) => id.productId);
  const productExist = Promise.all(mapId.map(async (map) => {
    const product = await productModel.findById(map);
    if (product === null) {
      return { message: `Sorry, the productId ${map} doens\'t Exist` };
    }
    return product;
  }));
  const [...inside] = await productExist;
  const includesProducts = inside.map((ins) => {
    if (ins.message) {
      const err = { error: { message: inside, code: 'Invalid_data' } };
      throw err;
    }
    return ins;
  });
  const createdSale = await salesModel.createSale(includesProducts);
  return createdSale.ops;
};

module.exports = {
  newSale,
};
