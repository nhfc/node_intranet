var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var db = req.db;
	var calls = db.get('calls');
	
	calls.find( {}, {}, function(err, calls) {
		res.render('calls/index', {
			"calls":calls
		});
	});
});

router.get('/new', function(req, res) {
	var db = req.db;
	var groups = db.get('groups');
	
	groups.find({},{fields: {}, sort: "_id"}, function(err, groups ) {
		res.render('calls/new', {
			title: "New Call",
			groups: groups
		});
	});
	
});

router.get('/:id', function(req, res) {
	var db = req.db;
	var calls = db.get('calls');
	
	calls.findby
});

module.exports = router;
