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
  hash: '#WSOF32'
};

module.exports = function (io, Vote) {
  var stream = T.stream('statuses/filter', { track: index.hash });
  stream.on('tweet', function (tweet) {
    io.emit('stream', {
      text: tweet.text,
      name: tweet.user.name,
      username: tweet.user.screen_name,
      icon: tweet.user.profile_image_url,
      hash: index.hash });
  });

  /**
   * serverside socket.io listener.
   * Here, the functions that the server reacts onto
   * specific messages are defined.
   */
  io.on('connection', function (socket) {
    console.log('new connection');


    /* set the game status to false when the timer is finished. */
    socket.on('timerCmd', function (data) {
      if (data.timerCmd === 'finished') {
        console.log('SOCKET ON : timerCmd - ' + data.timerCmd);
        Vote.findOneAndUpdate({}, { $set: { gameGoingOn: false } }, function (err) {
          if (err) {
            console.log('ERROR');
          }
        });
      }
    });

    /**
     * Listens to 'giveVoteStatus' message that receives the vote
     * status from the users using vote.html toggle overlay.
     * The socket message sender is defined in interaction/vote/vganchor.vote.controller.js
     */
    socket.on('giveVoteStatus', function (data) {
      var status = data.status;
      var prevStatus = data.prevStatus;
      console.log('socket giveVoteStatus received : ' + data.status + ' ' + data.prevStatus);

      // cast different vote according to status
      var fighter1;
      var fighter2;
      if (status === 1) {
        fighter1 = 1;
        if (prevStatus !== 0) {
          fighter2 = -1;
        }
      } else if (status === 2) {
        fighter2 = 1;
        if (prevStatus !== 0) {
          fighter1 = -1;
        }
      }


      Vote.findOneAndUpdate({},
          { $inc: { fighter1: fighter1, fighter2: fighter2 } }, function (err) {
          });

      console.log('db store successful');
    });
  });
};
