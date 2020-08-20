require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/productsController');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/products', productsController.router);

app.listen(PORT, () => console.log(`Port: ${PORT}`));
