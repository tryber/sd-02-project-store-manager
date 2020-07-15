require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const indexController = require('./controllers');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/products', indexController.newProductController.newProduct);
app.get('/products', indexController.newProductController.findAllProducts);
app.get('/products/:id', indexController.newProductController.findById);

app.use(indexController.errorController);

app.all('*', (req, res) => {
  return res.status(404).json({ error: { message: 'Endpoint not found', code: 404 } });
});

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});
