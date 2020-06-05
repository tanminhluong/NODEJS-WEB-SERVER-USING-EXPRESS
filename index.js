var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortid = require('shortid');
var FileSync = require('lowdb/adapters/FileSync');
var port = 3000;

var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({ users: [] })
  .write();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded





app.get('/', function(req, res){
	res.render('index', {
		name: 'Tan Minh'
	});
});

app.get('/users', function(req, res){
	res.render('users/index', {
		users: db.get('users').value()
	});
});

app.get('/users/search', function(req, res){
	var q = req.query.q;
	var matchedUser = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUser
	});
});

app.get('/users/create', function(req, res){
	res.render('users/create');
});

app.get('/users/:id', function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({ id: id}).value();
	res.render('users/view', {
		user: user
	})
});

app.post('/users/create', function(req, res){
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});


app.listen(3000, function(){
	console.log('server listening on port ' + port);
});