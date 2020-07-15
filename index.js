require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const indexController = require('./controllers');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/products', indexController.productController.newProduct);
app.get('/products', indexController.productController.findAllProducts);
app.get('/products/:id', indexController.productController.findById);

app.delete('/products/:id', indexController.productController.deleteById);

app.use(indexController.errorController);

app.all('*', indexController.endPointError.endPointError);

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});
