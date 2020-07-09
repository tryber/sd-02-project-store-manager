require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const indexController = require('./controllers');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/products', indexController.newProductController.newProduct)

app.use(indexController.errorController);

app.listen(port, () => {
  console.log(`Ouvindo a porta ${port}`);
});
