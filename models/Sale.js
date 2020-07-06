const connection = require('./connection');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');

class Sale {
  constructor(quantity, productId) {
    this.quantity = quantity;
    this.productId = productId;
  }

  getAll = async () =>
    connection().then((db) => db.collection('sales').find().toArray());

  getById = async (id) =>
    connection().then((db) =>
      db.collection('sales').findOne(ObjectId(id)),
    );

  insertMany = async (sales) =>
    connection().then((db) =>
      db.collection('sales').insertMany(sales),
    );

  deleteById = async (id) =>
    connection().then((db) =>
      db.collection('sales').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );

  updateById = async (id, quantity) =>
    connection().then((db) =>
      db.collection('sales').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { quantity } }),
    );
}

module.exports = Sale;
