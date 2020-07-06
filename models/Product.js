const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');
const connection = require('./connection');

class Product {
  constructor(name = "", quantity = 0) {
    this.name = name;
    this.quantity = quantity;
  }

  setName(name) {
    this.name = name;
  };

  setQuantity(quantity) {
    this.quantity = quantity;
  };

  getAll() {
    return connection()
      .then((db) => db.collection('products').find().toArray());
  }

  add() {
    return connection().then((db) =>
      db.collection('products').insertOne({ name: this.name, quantity: this.quantity }),
    );
  }

  getById(id) {
    return connection().then((db) =>
      db.collection('products').findOne(ObjectId(id)),
    );
  }

  getByName(name) {
    return connection().then((db) =>
      db.collection('products').findOne({ name }),
    );
  }

  deleteById(id) {
    return connection().then((db) =>
      db.collection('products').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );
  }

  updateById(id) {
    return connection().then((db) =>
      db.collection('products').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this }),
    );
  }
}

module.exports = Product;
