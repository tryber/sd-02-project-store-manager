require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/productsController');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/products', middlewares.validateProduct, productsController.router);

app.listen(PORT, () => console.log(`Port: ${PORT}`));
