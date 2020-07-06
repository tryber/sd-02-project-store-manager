const dbError = {
  error: {
    message: 'Error when connecting with database',
    code: 'db_connection_err',
  },
};

const productNotFoundError = {
  error: {
    message: 'Product not found.',
    code: 'not_found',
  },
};

const saleNotFoundError = {
  error: {
    message: 'Sale not found.',
    code: 'not_found',
  },
};

const repeatedName = {
  error: {
    message: 'Name already exists',
    code: 'repetead_name',
  },
};

const invalidDataError = {
  error: {
    message: 'Invalid data',
    code: 'invalid_data',
    data: 'The product name must be at least 5 letters and be a string. The quantity must be at least 1 an be an interger.',
  },
};

module.exports = {
  dbError,
  productNotFoundError,
  saleNotFoundError,
  repeatedName,
  invalidDataError,
};
