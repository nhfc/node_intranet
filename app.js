var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongo = require('mongodb');
var db = require('monk')('localhost/intranet');

var routes = require('./routes/index');
var users = require('./routes/users');
var calls = require('./routes/calls');

var app = express();

app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up sessions
app.use(session({
    secret:'j59vrgje3ekwu6lgse4dbdm8e',
    saveUninitialized: true,
    resave: true
}));

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());
app.use(function (req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	res.locals.user = req.user || null;
	next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	req.db =  db;
	next();
});


//Make sure people are logged in 
function ensureAuthenticated(req, res, next){
	if( req.isAuthenticated() ){
        return next();
    }
    res.redirect('/users/login');
};


// Enable routes, make sure those that need to be secured are secured
app.all('/calls*', ensureAuthenticated);
app.all('/users/logout', ensureAuthenticated);

app.use('/', routes);
app.use('/users', users);
app.use('/calls', calls);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
