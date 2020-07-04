const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = process.env.DB_URL;
const MONGO_DB_COLLECTION = process.env.DB_COLLECTION;
const connection = async () =>
  mongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => conn.db(MONGO_DB_COLLECTION));

module.exports = connection;
