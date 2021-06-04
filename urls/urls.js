const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('urls home page');
});

module.exports = router;
