var express = require('express');
var router = express.Router();
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');
var User = require('../models/user');

passport.use(
		new LdapStrategy({
		    server: {
		      url: 'ldap://nhfchq.com',
		      bindDn: 'web_svc',
		      bindCredentials: 'W!thh09e@4cc',
		      searchBase: 'dc=nhfchq,dc=com',
		      searchFilter: 'userprincipalname={{username}}@nhfchq.com',
		      searchAttributes: ['mail', 'department', 'manager', 'samaccountname']  
		    }
		})	
);
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

module.exports = router;
