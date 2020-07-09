const express = require('express');

const bodyParser = require('body-parser');

const productsRouter = require('./routers/productsRouter');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productsRouter);

app.use((err, req, res, next) => {
  if (err.message === 'Bad Request') {
    return res.status(400).json({ error: { message: err.message } });
  }
  if (err.message === 'Not Implemented') {
    return res.status(501).json({ error: { message: err.message } });
  }
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
