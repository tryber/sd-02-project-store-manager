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
    .then((db) => db
      .find()
      .toArray());

const getLastId = async (coll) =>
  dbConnection(coll)
    .then((db) => db
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray());

const getById = async (coll, obj) =>
  dbConnection(coll)
    .then((db) => db
      .findOne(obj));

const deleteById = async (coll, obj) =>
  dbConnection(coll)
    .then((db) => db
      .deleteOne(obj));

module.exports = {
  insert,
  findBy,
  findAll,
  getLastId,
  getById,
  deleteById,
};
