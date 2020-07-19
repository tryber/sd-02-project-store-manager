const boom = require('boom');

const errorcodes = {
  'not_found': 404,
  'forbidden': 403,
  'unauthorized': 401,
  'bad_data': 422,
  'already_exists': 409
}

const errorHandler = (error, _req, res, _next) => {
  console.log(error);
  return res.status(errorcodes[error.code] || 500).json({error});
}

module.exports = errorHandler;