const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.delete('/:id', rescue(salesController.remove));

router.get('/', rescue(salesController.list));

router.get('/:id', rescue(salesController.find));

router.post('/', rescue(salesController.create));

router.put('/:id', rescue(salesController.update));

module.exports = router;
