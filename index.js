const express = require('express');
const bodyParser = require('body-parser');
const Controllers = require('./Controllers');

const app = express();

app.use(bodyParser.json());

//app.get('/', (req, res) => res.send({ message: 'testando' }));

app.use('/products', Controllers.products);

app.listen(3000, () => console.log('Ouvindo na porta 3000!'));
