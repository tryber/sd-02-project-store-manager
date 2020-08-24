const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.get('/:id', (req, res, next) => controllers.salesController.get(req, res, next));

router.get('/', (req, res, next) => controllers.salesController.get(req, res, next));

router.post('/', (req, res, next) => controllers.salesController.create(req, res, next));

module.exports = router;
