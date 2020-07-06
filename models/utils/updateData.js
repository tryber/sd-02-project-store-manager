const connection = require('../connection');

const updateData = async (collection, itemToUpdate, fields) => {
  const db = await connection();
  await db.collection(collection).updateOne(itemToUpdate,
    {
      $set: fields,
    });

  return db.collection(collection).find(itemToUpdate).toArray();
};

const addQty = async (collection, id, quantity) => {
  const db = await connection();
  await db.collection(collection).updateOne(id,
    { $inc: { quantity } });
};

const rmvQty = async (collection, id, quantity) => {
  const db = await connection();
  await db.collection(collection).updateOne(id,
    { $inc: { quantity: -quantity } });
};

module.exports = {
  updateData,
  addQty,
  rmvQty,
};
