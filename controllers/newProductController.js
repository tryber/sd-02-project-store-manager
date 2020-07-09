const productModel = require('../models/productModel');
const validateNewProduct = require('../middlewares/validate');

const newProduct = async (req, res) => {
  const isValid = await validateNewProduct.validate(req.body);
  const existProduct = await productModel.findByName(req.body)

  if (isValid !== true ) return res.status(200).json({ message: isValid.err.message, code: 206 })
  if (existProduct.length === 0 && isValid === true) {
    await productModel.createProduct(req.body);
    return res.status(200)
      .json({ message: 'Item created', code: 201, produto: existProduct[0] });
  }
  return res.json({ message: 'Item already exists', code: 409 })
};

module.exports ={
  newProduct,
};
