const connection = require('./connection');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const getById = async (id) =>
  connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id))
  );
 
const insertMany = async (sales) =>
  connection().then((db) =>
    db.collection('sales').insertMany(sales)
  );

const deleteById = async (id) =>
  connection().then((db) =>
    db.collection('sales').deleteOne({ _id: new mongodb.ObjectID(id) })
  );

const updateById = async (id, quantity) =>
  connection().then((db) =>
    db.collection('sales').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { quantity } })
  );


module.exports = {
  getAll,
  getById,
  insertMany,
  deleteById,
  updateById,
};
