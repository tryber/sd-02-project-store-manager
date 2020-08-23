const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.route('/')
  .get((req, res) => controllers.productsController(req, res));

module.exports = router;
