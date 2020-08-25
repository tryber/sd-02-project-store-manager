const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.get('/:id', (req, res, next) => controllers.productsController.get(req, res, next));

router.delete('/:id', (req, res, next) => controllers.productsController.remove(req, res, next));

router.put('/:id', (req, res, next) => controllers.productsController.update(req, res, next));

router.get('/', (req, res, next) => controllers.productsController.get(req, res, next));

router.post('/', (req, res, next) => controllers.productsController.add(req, res, next));

module.exports = router;
