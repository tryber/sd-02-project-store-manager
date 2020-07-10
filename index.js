const express = require('express');

const bodyParser = require('body-parser');

const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
