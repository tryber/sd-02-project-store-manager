const mongoClient = require('mongodb').MongoClient;

async function connection() {
  return mongoClient
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((session) => session.db(process.env.DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
