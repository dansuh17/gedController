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
  access_token_secret:  keys.access_token_secret
});

// listens to this hastag!
var index = {
  hash: "#WSOF32"
};

module.exports = function(io, Vote) {

  var stream = T.stream('statuses/filter', {track: index.hash});
  stream.on('tweet', function (tweet) {
    //console.log(tweet);
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

    var tomUp;
    var devinUp;
    Vote.findOne({}, function(err, vote) {
      if (err) {
        console.log("DB ERROR");
        return next(err);
      }

      tomUp = vote.tomUp;
      devinUp = vote.devinUp;
    });

    socket.on('timerCmd', function(data) {
      if (data.timerCmd == "finished") {
        console.log("SOCKET ON : timerCmd - " + data.timerCmd);
        Vote.findOneAndUpdate({}, {$set : { gameGoingOn:false }}, function(err, vote) {
              if (err) {
                console.log("ERROR");
                return next(err);
              }
            }
        );
      }
    });

    /**
     * Listens to 'giveVoteStatus' message that receives the vote
     * status from the users using vote.html toggle overlay.
     * The socket message sender is defined in interaction/vote/vote.controller.js
     */
    socket.on('giveVoteStatus', function(data) {
      // 1 : tom, 2 : devin
      console.log("socket 'giveVoteStatus' received : " + data.status + " " + data.prevStatus);
      var status = data.status;
      var prevStatus = data.prevStatus;
      Vote.findOne({}, function(err, vote) {
        if (err) {
          console.log("DB ERROR");
          return next(err);
        }

        var tomUp = vote.tomUp;
        var devinUp = vote.devinUp;

        // cast different vote according to status
        if (status == 1) {
          tomUp++;
          if (prevStatus != 0) {
            devinUp--;
          }
        } else if (status == 2) {
          devinUp++;
          if (prevStatus != 0) {
            tomUp--;
          }
        }

        // update with the new data
        Vote.findOneAndUpdate({}, {tomUp: tomUp, devinUp: devinUp}, function(err, vote) {
          if (err) {
            return next(err);
          }
        });

        console.log("db store successful - result : tomUp: " + tomUp, " devinUp: " + devinUp);
      });
    });


    /* NOT USED */
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
