const connection = require('../connection');

const getAllData = (collection) => async () => {
  const db = await connection();
  const data = await db.collection(collection).find().toArray();
  return data;
};

module.exports = {
  getAllData,
};
