const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const errorHandler = require('./middlewares/error')

app.use(bodyParser.json());

app.use('/products', productController);

app.use('/sales', salesController);

// app.post('/products', (req, res) => );

app.listen(3000, () => console.log('ouvindo na porta 3000'));

app.use(errorHandler);