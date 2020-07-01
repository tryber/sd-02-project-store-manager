const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
