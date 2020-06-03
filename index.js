var express = require('express');
var app = express();

var port = 3000;

app.get('/', function(req, res){
	res.send('hello world');
});

app.listen(3000, function(){
	console.log('server listening on port ' + port);
});