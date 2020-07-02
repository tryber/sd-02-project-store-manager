const Product = require('../models/Product');

const sumSaleProductQuantity = (sales) => {
  const obj = {};
  for (let i = 0; i < sales.length; i += 1) {
    if (obj[sales[i].productId]=== undefined) {
      obj[sales[i].productId] = sales[i].quantity;
    } else {
      obj[sales[i].productId] += sales[i].quantity;
    }
  }
  return obj;
}

const productUpdateStock = async (sales) => {
  const obj = sumSaleProductQuantity(sales);
  Object.keys(obj).forEach(async (id) => {
    const newProduct = new Product();
    const { name, quantity } = await newProduct.getById(id);
    newProduct.setName(name);
    newProduct.setQuantity(quantity - obj[id]);
    await newProduct.updateById(id);
  });
};

module.exports = {
  productUpdateStock,
  sumSaleProductQuantity,
};
