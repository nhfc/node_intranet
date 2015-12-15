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

router.post('/new', function(req, res) {
	console.log(req.body);
})

router.get('/:id', function(req, res) {
	var db = req.db;
	var calls = db.get('calls');
	
	calls.findById(req.params.id, function(err, call) {
		call.comments.reverse();
		call.history.reverse();
		res.render('calls/view', {
			call: call
		});
	});
});

module.exports = router;
