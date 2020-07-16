const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello world'));

// app.post('/products', (req, res) => );

app.listen(3000, () => console.log('ouvindo na porta 3000'));
