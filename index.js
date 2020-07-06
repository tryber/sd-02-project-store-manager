const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');
const connection = require('./models/connections');

const app = express();

connection().then(() => {
  console.log('Conectado ao MongoDB');
});

app.get('/', controllers.productsController.getProducts);

app.listen(3000, () => console.log('Listening on 3000'));
