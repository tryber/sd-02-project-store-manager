const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./models/connections');

const productsRoutes = require('./controllers/productsController');
const salesRoutes = require('./controllers/salesController');

const app = express();

connection().then(() => {
  console.log('Conectado ao MongoDB');
});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productsRoutes);

app.use('/sales', salesRoutes);

app.listen(3000, () => console.log('Listening on 3000'));
