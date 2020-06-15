var express = require('express');

var controller = require('../controllers/product.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/', controller.create);

module.exports = router;	