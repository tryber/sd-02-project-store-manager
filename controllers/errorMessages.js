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
    data: 'Verify the productId or name and try again.',
  },
};

const saleNotFoundError = {
  error: {
    message: 'Sale or product not found.',
    code: 'not_found',
    data: `Field "productId" must be a valid and registered "_id" from products database.
    Endpoint "sales/id" must be a valid registered "_id" in sales database.`,
  },
};

const repeatedName = {
  error: {
    message: 'Name already exists',
    code: 'repetead_name',
  },
};

const invalidProductDataError = {
  error: {
    message: 'Invalid data',
    code: 'invalid_data',
    data: 'The product name must be at least 5 letters and be a string. The quantity must be at least 1 an be an interger.',
  },
};

const invalidSaleDataError = {
  error: {
    message: 'Invalid data',
    code: 'invalid_data',
    data: 'Field productId must be a valid and registered _id from products database. The quantity must be at least 0 an be an interger.',
  },
};

module.exports = {
  dbError,
  productNotFoundError,
  saleNotFoundError,
  repeatedName,
  invalidProductDataError,
  invalidSaleDataError,
};
