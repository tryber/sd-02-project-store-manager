const joinSchemas = require('./joinSchemas');

const Boom = require('@hapi/boom');

function isFieldsValid(body) {
  const HEADERS_FIELDS = JSON.parse(process.env.HEADERS_FIELDS);

  return Object.entries(body).every(([key]) => HEADERS_FIELDS.includes(key));
}

function isValid(body) {
  if (!isFieldsValid(body)) return false;
  return true;
}

async function create(body) {
  const { error, value } = await joinSchemas.productsSchema.validate(body, { abortEarly: false });

  if (error) {
    throw Boom.badRequest(
      error.name,
      error.details.map(({ message }) => message),
    );
  }

  throw new Error('all ok');
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
