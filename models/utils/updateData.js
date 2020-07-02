const connection = require('../connection');

const updateData = async (collection, itemToUpdate, { name, quantity }) => {
  const db = await connection();
  await db.collection(collection)
    .updateOne(itemToUpdate,
      {
        $set: {
          name,
          quantity,
        },
      });

  return db.collection(collection).find(itemToUpdate).toArray();
};

module.exports = {
  updateData,
};
