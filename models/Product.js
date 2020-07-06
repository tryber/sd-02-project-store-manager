const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');
const connection = require('./connection');

class Product {
  constructor(name = '', quantity = 0) {
    this.name = name;
    this.quantity = quantity;
  }

  setName(name) {
    this.name = name;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  static async getAll() {
    return connection().then((db) => db.collection('products').find().toArray());
  }

  async add() {
    return connection().then((db) =>
      db.collection('products').insertOne({ name: this.name, quantity: this.quantity }),
    );
  }

  static async getById(id) {
    return connection().then((db) =>
      db.collection('products').findOne(ObjectId(id)),
    );
  }

  static async getByName(name) {
    return connection().then((db) =>
      db.collection('products').findOne({ name }),
    );
  }

  static async deleteById(id) {
    return connection().then((db) =>
      db.collection('products').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );
  }

  async updateById(id) {
    return connection().then((db) =>
      db.collection('products').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this }),
    );
  }
}

module.exports = Product;
