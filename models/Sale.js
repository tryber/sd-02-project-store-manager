const connection = require('./connection');
const mongodb = require('mongodb');
const { ObjectId } = require('mongodb');

class Sale {
  constructor(array) {
    this.array = array;
  }

  static async getAll() {
    return connection().then((db) => db.collection('sales').find().toArray());
  }

  static async getById(id) {
    return connection().then((db) =>
      db.collection('sales').findOne(ObjectId(id)),
    );
  }

  async add() {
    return connection().then((db) =>
      db.collection('sales').insertOne(this),
    );
  }

  static async deleteById(id) {
    return connection().then((db) =>
      db.collection('sales').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );
  }

  async updateById(id) {
    return connection().then((db) =>
      db.collection('sales').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this }),
    );
  }
}

module.exports = Sale;
