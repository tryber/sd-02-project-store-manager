const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const { errorController } = require('./controllers/errorController');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorController);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
