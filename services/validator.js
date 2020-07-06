const Product = require('../models/Product');
const schemasJoi = require('./schemasJoi');
const { sumSaleProductQuantity } = require('./productQuantity');

const product = {
  hasName: async (name) => {
    if (await Product.getByName(name)) {
      return Promise.reject({ error: { message: 'nome já existe', code: 'alredy_exist' } });
    }
  },
};

const sales = {
  productIds: async (salesArr) => {
    const promises = [];
    for (let i = 0; i < salesArr.length; i += 1) {
      const promise = new Promise(async (resolve, reject) => {
        if (await Product.getById(salesArr[i].productId)) {
          return resolve(true);
        }
        return reject({ error: { message: `Produto "${salesArr[i].productId}" não existe`, code: 'invalid_data' } });
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  },
  isValidSchemaJoi: async (salesArr) => {
    const promises = [];
    for (let i = 0; i < salesArr.length; i += 1) {
      const { quantity } = salesArr[i];
      promises.push(schemasJoi.sales.validateAsync({ quantity }));
    }
    return Promise.all(promises);
  },
  productStock: async (salesArr) => {
    const promises = [];
    const obj = sumSaleProductQuantity(salesArr);
    for (let i = 0; i < salesArr.length; i += 1) {
      const { productId } = salesArr[i];
      const promise = new Promise(async (resolve, reject) => {
        const { quantity } = await Product.getById(productId);
        if (quantity >= obj[productId]) {
          return resolve(true);
        }
        return reject({ error: { message: `Produto "${productId}" não tem estoque o suficiente`, code: 'invalid_data' } });
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  },
};

module.exports = {
  product,
  sales,
};
