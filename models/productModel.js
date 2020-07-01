const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const add = ({ name, quantity }) =>
  connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

const getById = async (id) =>
  connection().then((db) =>
    db.collection('products').findOne(ObjectId(id))
  );

const getByName = async (name) =>
  connection().then((db) =>
    db.collection('products').findOne({ name })
  );

const deleteById = async (id) =>
  connection().then((db) =>
    db.collection('products').deleteOne({ _id: new mongodb.ObjectID(id) })
  );

const updateById = async (id, name, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { name, quantity } })
  );

module.exports = {
  getAll,
  add,
  getById,
  getByName,
  deleteById,
  updateById,
};
