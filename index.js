require('dotenv').config();

const rescue = require('express-rescue');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { MongoError, ProductNotFound } = require('./middleware/errorObjects');

const productRouter = require('./routers/productRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', productRouter);

app.use(rescue.from(ProductNotFound, (err, req, res, _next) => {
  const { message, status } = err;
  res.status(status)
    .send({ error: { message, code: status } });
}));

app.use(rescue.from(MongoError, (err, req, res, _next) => {
  const { message, status } = err;
  res.status(status)
    .send({ error: { message, code: status } });
}));

app.use((err, req, res, _next) => {
  const { message } = err;
  res.status(500)
    .send({ error: { message, code: 500 } });
});

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
