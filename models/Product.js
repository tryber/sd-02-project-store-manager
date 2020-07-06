const { ObjectId } = require('mongodb');
const mongodb = require('mongodb');
const connection = require('./connection');

class Product {
  constructor(name = '', quantity = 0) {
    this.name = name;
    this.quantity = quantity;
  }

  setName = (name) => {
    this.name = name;
  }

  setQuantity = (quantity) => {
    this.quantity = quantity;
  }

  getAll = () =>
    connection().then((db) => db.collection('products').find().toArray());


  add = () =>
    connection().then((db) =>
      db.collection('products').insertOne({ name: this.name, quantity: this.quantity }),
    );

  getById = (id) =>
    connection().then((db) =>
      db.collection('products').findOne(ObjectId(id)),
    );

  getByName = (name) =>
    connection().then((db) =>
      db.collection('products').findOne({ name }),
    );

  deleteById = (id) =>
    connection().then((db) =>
      db.collection('products').deleteOne({ _id: new mongodb.ObjectID(id) }),
    );

  updateById = (id) =>
    connection().then((db) =>
      db.collection('products').updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this }),
    );
}

module.exports = Product;
