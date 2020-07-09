const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', rescue(productController.create));

module.exports = router;
