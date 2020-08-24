require('dotenv').config();

const rescue = require('express-rescue');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { MongoError, ProductNotFound, SalesNotFound } = require('./middleware/errorObjects');

const routers = require('./routers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', routers.productRouter);
app.use('/sales', routers.salesRouter);

app.use(rescue.from(ProductNotFound, (err, req, res, _next) => {
  const { message, status } = err;
  res.status(status)
    .send({ error: { message, code: status } });
}));
app.use(rescue.from(SalesNotFound, (err, req, res, _next) => {
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
