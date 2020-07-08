const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const productRouter = require('./routes/productRouter');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productRouter);

app.get('*', (_req, res) => (
  res.status(404).json({ message: 'This is a not good option' })
));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
