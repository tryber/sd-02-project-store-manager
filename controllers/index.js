const productController = require('./productController');
const salesController = require('./salesController');
const endPointError = require('./endPointError');
const errorController = require('./errorController');

module.exports = {
  productController,
  endPointError,
  salesController,
  errorController,
};
