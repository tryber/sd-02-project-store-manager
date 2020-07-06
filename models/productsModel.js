const connection = require('./connections');

const getAll = async () => (
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) =>
      products.map(({ _id, name, quantity }) => ({
        id: _id,
        name,
        quantity,
      })))
);

module.exports = {
  getAll,
};
