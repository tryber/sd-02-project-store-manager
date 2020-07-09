const joinSchemas = require('./joinSchemas');

function isFieldsValid(body) {
  const HEADERS_FIELDS = JSON.parse(process.env.HEADERS_FIELDS);

  return Object.entries(body).every(([key]) => HEADERS_FIELDS.includes(key));
}

function isValid(body) {
  if (!isFieldsValid(body)) return false;
  return true;
}

async function create(body) {
  const { error, value } = await joinSchemas.productsSchema.validate(body);
  console.log(error.details, value);
  Boom.boomify(error, { statusCode: 404 });
  throw new Error('Bad Request');
}

// async function erro1(bool) {
//   return new Promise((resolve, reject) => {
//     if (bool) {
//       resolve(2);
//     }
//     reject(new Error('Bad Request'));
//   });
// }

// async function erro2(bool) {
//   return new Promise((resolve, reject) => {
//     if (bool) {
//       resolve(1);
//     }
//     reject(new Error('Not Implemented'));
//   });
// }

module.exports = {
  create,
};
