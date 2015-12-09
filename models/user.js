var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	 firstName: {
	    type: String
	},
    lastName: {
        type: String
    },
	username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    role: {
    	type: String
    },
    supervisor_id: {
    	type: String
    },
    department: {
    	type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.createUser = function(newUser,callback){
	newUser.save(callback);
};