var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({data: {a: 1, b: 2}});
});

module.exports = router;
