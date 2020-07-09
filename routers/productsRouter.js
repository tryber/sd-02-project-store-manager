const express = require('express');

const router = express.Router();

router.post('/', (_req, res) => {
  console.log('Post here');
});

module.exports = router;
