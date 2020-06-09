var express = require('express');

var controller = require('../controllers/product.controller.js');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;	