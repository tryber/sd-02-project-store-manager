const Product = require('../models/Product');

const product = {
  hasName: async (name) => {
    if (await Product.getByName(name)) {
      return Promise.reject({ error: { message: 'nome já existe', code: 'already_exists' } });
    }
  },
};

const sales = {
  productIds: async (sale) => {
    const promises = [];
    for (let i = 0; i < sale.length; i += 1) {
      const promise = new Promise(async (resolve, reject) => {
        if (await Product.getById(sale[i].productId)) {
          return resolve(true);
        }
        return reject({ error: { message: `Produto "${sale[i].productId}" não existe`, code: 'invalid_data' } });
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  },
  productStock: async (sale) => {
    const promises = [];
    for (let i = 0; i < sale.length; i += 1) {
      const promise = new Promise(async (resolve, reject) => {
        const { productId, quantity: qSale } = sale[i];
        const { name, quantity: qProduct } = await Product.getById(productId);
        if (qProduct - qSale > 0) {
          const newProduct = new Product(name, qProduct - qSale);
          await newProduct.updateById(productId);
          return resolve(true);
        }
        return reject({ error: { message: `Produto "${name}" não tem estoque o suficiente`, code: 'invalid_data' } });
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
