const { ObjectId } = require('mongodb');
const connection = require('./connections');

const createSales = async (sale) => {
  try {
    await connection()
      .then(((db) => db.collection('sales').insertOne({ sale })));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getAllSales = async () => {
  try {
    const allSales = await connection()
      .then((db) => db.collection('sales').find().toArray())
      .then((sales) => sales.map(({ _id, sale }) => ({
        id: _id,
        sale,
      })));
    return allSales;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const saleById = await connection()
      .then((db) => db.collection('sales').find({ _id: ObjectId(id) }).toArray());
    return saleById || [];
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const { result } = await connection()
      .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const updateSale = async (id, updatedSale) => {
  if (!ObjectId.isValid(id)) return 'not_found';
  try {
    const { result } = await connection()
      .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: updatedSale }));
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  createSales,
  getAllSales,
  findSaleById,
  deleteSaleById,
  updateSale,
};
