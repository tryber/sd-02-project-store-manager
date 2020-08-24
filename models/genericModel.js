const dbConnection = require('./connection');

const insert = async (coll, product) =>
  dbConnection(coll)
    .then((db) => db
      .insertOne(product));

const findBy = async (coll, data) =>
  dbConnection(coll)
    .then((db) => db
      .findOne(data));

const findAll = async (coll) =>
  dbConnection(coll)
    .then((db) => db.find()
      .toArray());

const getLastId = async (coll) =>
  dbConnection(coll)
    .then((db) => db.find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray());

module.exports = {
  insert,
  findBy,
  findAll,
  getLastId,
};
