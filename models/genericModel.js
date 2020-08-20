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
  .then((db) => db.find().toArray());

module.exports = {
  insert,
  findBy,
  findAll,
};
