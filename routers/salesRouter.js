const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.post('/', (req, res, next) => controllers.salesController.create(req, res, next));

module.exports = router;
