require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

const PORT = process.env.DB_PORT;
app.use(bodyParser.json());

app.get('/products', productController.getAll);
app.post('/products', productController.createOne);

app.get('/products/:id', productController.getById);
app.delete('/products/:id', productController.deleteById);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
