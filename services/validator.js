const Product = require('../models/Product');
const schemasJoi = require('./schemasJoi');
const { sumSaleProductQuantity } = require('./productQuantity');

const product = {
  hasName: async (name) => {
    if (await new Product().getByName(name)) {
      throw new Error({
        details: [
          { message: 'Nome já existe.' },
        ],
      });
    }
  },
};

const sales = {
  productIds: async (salesArr) => {
    const promises = [];
    for (let i = 0; i < salesArr.length; i += 1) {
      const promise = new Promise(async (resolve, reject) => {
        if (await new Product().getById(salesArr[i].productId)) {
          return resolve(true);
        }
        return reject({ details: [{ message: `Id: "${salesArr[i].productId}" não existe.` }] });
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
      const product = await new Product().getById(productId);
      const promise = new Promise(async (resolve, reject) => {
        if (product.quantity >= obj[productId]) {
          return resolve(true);
        }
        return reject({ details: [{ message: `Produto: "${productId}" não tem estoque o suficiente.` }] });
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }
};

module.exports = {
  product,
  sales,
};
