/**
 * Created by zoonoo on 7/31/16.
 */

// twitter embed
var Twit = require('twit');

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


module.exports = function(io, Vote) {

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


  /**
   * serverside socket.io listener.
   * Here, the functions that the server reacts onto
   * specific messages are defined.
   */

  io.on('connection', function(socket) {
    console.log('new connection');
    socket.emit('welcome', {});

    var tomUp;
    var devinUp;
    Vote.findOne({}, function(err, vote) {
      if (err) {
        console.log("DB ERROR");
        return next(err);
      }
      console.log("retrieve from DB");

      tomUp = vote.tomUp;
      devinUp = vote.devinUp;

    });


    socket.on('addPowerBalance', function(data) {
      io.emit('addPowerBalance', data);

      if (parseInt(data.amount) > 0) {
        tomUp += parseInt(data.amount);
      }
      else {
        devinUp -= parseInt(data.amount);
      }

      Vote.findOneAndUpdate({}, {tomUp:tomUp, devinUp:devinUp}, function(err, vote) {
        if (err) {
          console.log("DB ERROR");
          return next(err);
        }
        console.log("db store successful")
      });

    });
  });
};
