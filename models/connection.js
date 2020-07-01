const mongoClient = require('mongodb').MongoClient;

const { MONGO_DB_URL, DB_NAME } = process.env;

const connection = () => (mongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  }));

module.exports = connection;
