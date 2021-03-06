require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var csrf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var port = 3000;
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route')

var apiProductRoute = require('./api/routes/product.route')

var authMiddleware = require('./middlewares/auth.middleware.js');
var sessionMiddleware = require('./middlewares/session.middleware.js');

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');


app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(sessionMiddleware);


app.get('/', function(req, res){
	res.render('index', {
		name: 'Tan Minh'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
// app.use(csrf({ cookie: true}));
app.use('/products', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.use('/api/products', apiProductRoute);

app.listen(3000, function(){
	console.log('server listening on port ' + port);
});