// var db = require('../db');
var User = require('../models/user.model');
var shortid = require('shortid');
var md5 = require('md5');

module.exports.login = function(req, res){
	res.render('auth/login');
}

module.exports.postLogin = async function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	var users = await User.find();
	
	var user = users.filter(function(item){
		return item.email === email;
	});

	if(!user){
		res.render('auth/login', {
			errors: [
				'User does not exist.'
			],
			values: req.body
		});
		return;
	}

	var hashPassword = md5(password);

	if(user[0].password !== hashPassword){
		res.render('auth/login',{
			errors: [
				'Wrong password.'
			],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');
};