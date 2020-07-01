const Product = require('../models/productModel');
const schemasJoi = require('../models/schemasJoi');

const product = {
  hasName: async (name) => {
    if (await Product.getByName(name)) {
      throw {
        details: [
          { message: 'Nome já existe.' }
        ],
      };
    }
  },
};

const sales = {
  productIds: async (sales) => {
    for (const sale of sales) {
      const product = await Product.getById(sale.productId);
      if (!product) {
        throw {
          details: [
            { message: `Id: "${sale.productId}" não existe.` }
          ],
        };
      }
    }
  },
  isValidSchemaJoi: async (sales) => {
    for (const sale of sales) {
      const { quantity } = sale;
      await schemasJoi.sales.validateAsync({ quantity });
    }
  },
};

module.exports = {
  product,
  sales,
};
