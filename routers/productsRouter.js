const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const productController = require('../controllers/productController');

router.delete('/:id', rescue(productController.remove));

router.get('/', rescue(productController.list));

router.get('/:id', rescue(productController.find));

router.post('/', rescue(productController.create));

router.put('/:id', rescue(productController.update));

module.exports = router;
