require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());


app.get('/products', productController.listProducts);
app.post('/products', productController.insertProduct);

app.get('/products/:id', productController.productById);

app.delete('/products/:id', productController.productDeleteById);
app.put('/products/:id', productController.productUpdateById);

app.get('/sales', salesController.listSales);
app.get('/sales/:id', salesController.saleById);
app.post('/sales', salesController.saleInsertMany);
app.delete('/sales/:id', salesController.saleDeleteById);
app.put('/sales/:id', salesController.saleUpdateById);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
