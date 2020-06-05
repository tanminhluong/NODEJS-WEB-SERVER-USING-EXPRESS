var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var userRoute = require('./routes/user.route');

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
	res.render('index', {
		name: 'Tan Minh'
	});
});

app.use('/users', userRoute);


app.listen(3000, function(){
	console.log('server listening on port ' + port);
});