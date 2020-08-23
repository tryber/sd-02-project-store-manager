const express = require('express');
const rescue = require('express-rescue');

const controllers = require('../controllers');
const { ProductNotFound, MongoError } = require('../middleware/errorObjects');

const router = express.Router();

router.get('/:id', (req, res, next) => controllers.productsController.getProducts(req, res, next));
router.get('/', (req, res, next) => controllers.productsController.getProducts(req, res, next));

router.post('/', (req, res, next) => controllers.productsController.addProduct(req, res, next));

router.use(rescue.from(ProductNotFound, (err, req, res, _next) => {
  const { message, status } = err;
  res.status(status)
    .send({ error: { message, code: status } });
}));

router.use(rescue.from(MongoError, (err, req, res, _next) => {
  const { message, status } = err;
  res.status(status)
    .send({ error: { message, code: status } });
}));

router.use((err, req, res, _next) => {
  const { message } = err;
  res.status(500)
    .send({ error: { message, code: 500 } });
});

module.exports = router;
