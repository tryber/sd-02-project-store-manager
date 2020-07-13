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

const createProducts = async (product) => {
  try {
    connection()
      .then(((db) => db.collection('products').insertOne(product)));
    return 'Produto Criado';
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAll,
  createProducts,
};
