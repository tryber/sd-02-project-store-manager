const connection = require('../connection');

const deleteData = async (collection, itemToDelete) => {
  const db = await connection();
  const document = await db.collection(collection).find(itemToDelete).toArray();
  await db.collection(collection).deleteOne(itemToDelete);
  return document;
};

module.exports = {
  deleteData,
};
