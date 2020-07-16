const mongoClient = require('mongodb').MongoClient;

const connection = () =>
  mongoClient
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 1000,
    })
    .then((conn) => conn.db(process.env.DB));

module.exports = connection;
