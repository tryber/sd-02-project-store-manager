const { mongoClient } = require('mongodb');

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const DB_NAME = process.env.DB_NAME;

const connection = () => {
  return mongoClient
    .connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
   });
};

module.exports = connection;
