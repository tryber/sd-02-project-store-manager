const connection = require('./connection');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');

class Sale {
  constructor(quantity, productId) {
    this.quantity = quantity;
    this.productId = productId;
  }

  async getAll() {
    return connection().then((db) => db.collection('sales').find().toArray());
  }

  async getById(id) {
    return  connection().then((db) =>
      db.collection('sales').findOne(ObjectId(id)),
    );
  }

  async insertMany(sales) {
    return connection().then((db) =>
      db.collection('sales').insertMany(sales),
    );
  }

  async deleteById(id) {
    return connection().then((db) =>
      db.collection('sales').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );
  }

  async updateById(id, quantity) {
    return connection().then((db) =>
      db.collection('sales').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { quantity } }),
    );
  }
}

module.exports = Sale;
