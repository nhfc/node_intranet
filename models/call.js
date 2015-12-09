var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calls');

var db = mongoose.connection;

// Call Schema
var CallSchema = mongoose.Schema({
	created: {
		type: Date
	},
	status: {
	    type: String
	},
    comment: {
        type: String
    },
	group: {
		type: String
	},
	user: {
		type: String
	}
});

var Call = module.exports = mongoose.model('Call', CallSchema);

module.exports.getCallById = function( id, callback ) {
		Call.findById(id, callback);
};