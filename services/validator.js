const Product = require('../models/productModel');
const schemasJoi = require('../models/schemasJoi');

const product = {
  hasName: async (name) => {
    if (await Product.getByName(name)) {
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
      const promise = new Promise(async (resolve, reject) =>
        (await Product.getById(salesArr[i].productId)) ?
          resolve(true) :
          reject({ details: [{ message: `Id: "${salesArr[i].productId}" não existe.` }] }),
      );
      promises.push(promise);
    }
    return Promise.all(promises);
  },
  isValidSchemaJoi: async (salesArr) => {
    for (let i = 0; i < salesArr.length; i += 1) {
      const { quantity } = salesArr[i];
      await schemasJoi.sales.validateAsync({ quantity });
    }
  },
};

module.exports = {
  product,
  sales,
};
