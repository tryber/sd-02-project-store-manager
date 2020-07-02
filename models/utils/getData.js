const connection = require('../connection');

const getAllData = (collection) => async () => {
  const db = await connection();
  const data = await db.collection(collection).find().toArray();
  return data;
};

const getDataFromField = async (collection, field) => {
  const db = await connection();
  const data = await db.collection(collection).find(field).toArray();
  return data;
};

module.exports = {
  getAllData,
  getDataFromField,
};
