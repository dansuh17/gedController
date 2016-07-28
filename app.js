var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Socket.io
var socketio = require('socket.io');
var app = express();
var io = socketio();
app.io = io;

// twitter embed
var Twit = require('twit');

// mongoose
var mongoose = require('mongoose');
require('./models/votes');
mongoose.connect('mongodb://localhost:27017/ged');

// routes
var routes = require('./routes/index')(io);
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'public'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

/**
 * Twitter Socket Interface
 */
var keys = require('./keys');
var T = new Twit({
  consumer_key:         keys.consumer_key,
  consumer_secret:      keys.consumer_secret,
  access_token:         keys.access_token,
  access_token_secret:  keys.access_token_secret,
});

var index = {
  hash: "#WSOF32"
};

var stream = T.stream('statuses/filter', {track: index.hash});
stream.on('tweet', function (tweet) {
  console.log(tweet);
  io.emit('stream', {
    text:tweet.text,
    name:tweet.user.name,
    username:tweet.user.screen_name,
    icon:tweet.user.profile_image_url,
    hash:index.hash});
});

module.exports = app;
