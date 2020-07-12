require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const endpointController = require('./controllers/endpointController');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const { errorController } = require('./controllers/errorController');

const app = express();

const PORT = process.env.DB_PORT;
app.use(bodyParser.json());

app.get('/products', productController.getAll);
app.post('/products', productController.createOne);

app.get('/products/:id', productController.getById);
app.delete('/products/:id', productController.deleteById);
app.put('/products/:id', productController.updateById);

app.get('/sales', salesController.getAll);
app.post('/sales', salesController.createOne);

app.get('/sales/:id', salesController.getById);
app.delete('/sales/:id', salesController.deleteById);

app.use(errorController);

app.all('*', endpointController.endpointNotFound);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
