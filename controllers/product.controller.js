var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res){
	var page = parseInt(req.query.page) || 1; //n
	var perPage = 8;
	var totalPages = Math.ceil(db.get('products').value().length / perPage);
	var arr = [];

	if(page===1) {
		arr.push(page,page+1,page+2,'Next','Last');
	}
	if(page > 1 && page < totalPages) {
		arr.push('First', 'Prev', page-1, page , page+1, 'Next', 'Last');
	}
	if(page === totalPages) {
		arr.push('First', 'Prev', page-2, page-1,page);
	}
	
	// var prevPage = page - 1;
	// var nextPage = page + 1; 

	var start = (page - 1) * perPage;
	var end = page * perPage;

	res.render('products/index', {
		products: db.get('products').value().slice(start, end),
		currPage : page,
		prevPage : page-1,
		nextPage : page+1,
		totalPages: arr,
		lastPage: totalPages
		
	}); 
}