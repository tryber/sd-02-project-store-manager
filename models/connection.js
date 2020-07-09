const mongoClient = require('mongodb').MongoClient;

const connection = () =>
  mongoClient
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
