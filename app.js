var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var btc = require('./modules/bitcoin');
var funk = require('./modules/cypherfunk');
var panda = require('./modules/pandacoin');
var zeit = require('./modules/zeitcoin');

var index = require('./routes/index');
var users = require('./routes/users');
var bitcoin = require('./routes/bitcoin');
var cypherfunk = require('./routes/cypherfunk')(funk);
var pandacoin = require('./routes/pandacoin')(panda);
var zeitcoin = require('./routes/zeitcoin')(zeit);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/bitcoin', bitcoin);
app.use('/cypherfunk', cypherfunk);
app.use('/pandacoin', pandacoin);
app.use('/zeitcoin', zeitcoin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
