require('dotenv').config();

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const productRouter = require('./routers/productRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', productRouter);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
