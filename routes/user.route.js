var express = require('express');
var controller = require('../controllers/user.controller.js');
var validate = require('../validate/user.validate.js');
var authMiddleware = require('../middlewares/auth.middleware.js');
var multer = require('multer');

var router = express.Router();
router.get('/', controller.index);

router.get('/cookie', function(req, res , next){
	res.cookie('user-id', 12345);
	res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;