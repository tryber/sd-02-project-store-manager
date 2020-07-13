const connection = require('./connection');
const { ObjectId } = require('mongodb');

// const findByName = async (productName, productId = null) => {
//   const productData = await connection()
//     .then((db) => db.collection('products').findOne({
//       name: productName,
//       _id: { $ne: ObjectId(productId) },
//     }));

//   if (!productData) return null;

//   const { _id, name, quantity } = productData;

//   return { id: _id, name, quantity };
// };

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (!saleData) return null;

  const { _id, productId, quantity } = saleData;

  return { id: _id, productId, quantity };
};

const create = async (salesData) => (
  connection()
    .then((db) => db.collection('sales').insertMany(salesData))
    .then((result) => (
      salesData.map(({ productId, quantity }, index) => ({
        id: result.insertedIds[index],
        productId,
        quantity,
      }))
    ))
);

const getAll = async () => (
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => sales.map(({ _id, productId, quantity }) => ({
      id: _id,
      productId,
      quantity,
    })))
);

// const remove = async (id) => (
//   connection()
//     .then((db) => db.collection('products').removeOne({ _id: ObjectId(id) }))
// );

// const update = async (id, name, quantity) => (
//   connection()
//     .then((db) => db.collection('products').updateOne(
//       { _id: ObjectId(id) },
//       { $set: { name, quantity } },
//     ))
//     .then(() => ({ id, name, quantity }))
// );

module.exports = {
  create,
  getAll,
  findById,
//   findByName,
//   remove,
//   update,
};
