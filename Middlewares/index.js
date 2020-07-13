const productValidator = require('./productValidator');
const salesValidator = require('./salesValidator');
const boomErrorHandler = require('./boomErrorHandler');
const otherErrorsHandler = require('./otherErrorsHandler');

module.exports = {
  productValidator,
  salesValidator,
  boomErrorHandler,
  otherErrorsHandler,
};
