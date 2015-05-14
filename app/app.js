var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('../config/db');

var connect = db.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function callback() { 
  console.log('database connected successfully (in app.js)');
});

var routes = require('./routes/controller.js');

var app = express();

// declares a static file to use for linking css/js
app.use(express.static(path.join(__dirname, '../views/assets/stylesheets')));
app.use(express.static(path.join(__dirname, '../views/assets/js')));

// view engine setup
app.set('views', path.join(__dirname, '../views/templates/'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//DB access for our router
app.use(function(req, res, next){
    req.db = db.db;
    next();
});

app.use('/', routes);

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