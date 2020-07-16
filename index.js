const express = require('express');
const app = express();
const productController = require('./controllers/productController');

app.get('/', (req, res) => res.send('hello world'));

app.use('/products', productController);

// app.post('/products', (req, res) => );

app.listen(3000, () => console.log('ouvindo na porta 3000'));
