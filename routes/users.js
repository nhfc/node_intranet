var express = require('express');
var router = express.Router();
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');
var User = require('../models/user')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Login Page */
router.get('/login', function(req, res, next) {
  res.render('users/login', {
      'title': 'Login'
  });
});

router.post('/login', passport.authenticate('ldapauth',{failureRedirect: '/users/login', failureFlash: 'Invalid username or password'}), function(req, res){
    console.log('Authentication Successful');
    req.flash('success', 'You are logged in');
    res.redirect('/');
});

/* Logout Page */
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You have sucessfully logged out.');
	res.redirect('/users/login');
});

//LdapAuthentication
passport.use(
		new LdapStrategy({
			server: {
		      url: 'ldap://nhfchq.com',
		      bindDn: 'web_svc',
		      bindCredentials: 'W!thh09e@4cc',
		      searchBase: 'dc=nhfchq,dc=com',
		      searchFilter: '(sAMAccountName={{username}})',
		      searchAttributes: ['givenname', 'sn', 'displayname', 'mail', 'department', 'manager', 'samaccountname']  
		    }
		})	
);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = router;
