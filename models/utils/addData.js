const connection = require('../connection');

const addData = async (collection, fieldsToAdd) => {
  const db = await connection();
  await db.collection(collection).insertOne(fieldsToAdd);
  return db.collection(collection).find(fieldsToAdd).toArray();
};

module.exports = {
  addData,
};
