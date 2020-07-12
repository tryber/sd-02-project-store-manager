const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const { errorMid } = require('./middlewares');
const { productRouter } = require('./routes');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productRouter);

app.use('*', (_req, _res, next) => (
  next({ code: 'not_found', message: 'This is a not good option!' })
));

app.use(errorMid);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
