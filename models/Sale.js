const connection = require('./connection');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');

class Sale {
  constructor(quantity, productId) {
    this.quantity = quantity;
    this.productId = productId;
  }

  static async getAll() {
    return connection().then((db) => db.collection('sales').find().toArray());
  }

  static async getById(id) {
    return connection().then((db) =>
      db.collection('sales').findOne(ObjectId(id)),
    );
  }

  static async insertMany(sales) {
    return connection().then((db) =>
      db.collection('sales').insertMany(sales),
    );
  }

  static async deleteById(id) {
    return connection().then((db) =>
      db.collection('sales').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );
  }

  static async updateById(id, quantity) {
    return connection().then((db) =>
      db.collection('sales').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { quantity } }),
    );
  }
}

module.exports = Sale;
