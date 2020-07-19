const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productService = require('../services/productService');

const createProduct = async ({ name, quantity }) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ id: insertedId, name, quantity }));

const findProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const findProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products.map(({ _id, name, quantity }) => ({ id: _id, name, quantity })));

const showOneProduct = async (id) =>
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .then(({ _id, name, quantity }) => ({ id: _id, name, quantity }));

module.exports = { createProduct, findProductByName, findProducts, showOneProduct };