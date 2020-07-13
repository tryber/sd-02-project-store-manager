const boom = require('boom');

const productValidator = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (typeof name !== 'string' || name.length <= 5) {
    //return { dataIsValid: false, data: 'name' };
    next(boom.badData('Dados inválidos', 'name'));
  }

  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0) {
   //return { dataIsValid: false, data: 'quantity' };
   return next(boom.badData('Dados inválidos', 'quantity'));
  }
//   if (!uniqueName) return { dataIsValid: true };

//   const nameAlreadyExists = await findByName(name);

//   if (nameAlreadyExists) {
//     return { dataIsValid: false, data: 'name' };
//   }

//   return { dataIsValid: true };
  return next();
};

module.exports = productValidator;
