require('dotenv').config();
const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/products', productsController.router);

app.use('/sales', salesController.router);

app.use('*', (_req, res) => res.status(404).json({ message: 'Route not valid', code: 'not_found' }));

app.listen(PORT, () => console.log(`Port: ${PORT}`));
