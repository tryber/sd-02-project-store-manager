require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const routerProducts = require('./routes/productsRouter');
const routerSales = require('./routes/salesRouter');
const errorController = require('./controllers/errorController');

const app = express();
app.use(bodyParser.json());

app.use('/products', routerProducts);
app.use('/sales', routerSales);

app.use(errorController);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
