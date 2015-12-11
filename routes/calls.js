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

module.exports = router;
