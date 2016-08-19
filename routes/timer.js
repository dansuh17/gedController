var express = require('express');
var router = express.Router();

module.exports = function (io, Vote) {
  router.post('/roundNo/', function (req, res) {
    console.log('API CALL : POST /timer/roundNo/ :' + req.body.roundNo);

    // to the rest page.
    io.emit('roundNo', {
      roundNo: req.body.roundNo
    });

    res.json({ sent: 'done' });
  });

  router.post('/countdown/', function (req, res) {
    var newCountdown = req.body.countdown;
    console.log('API CALL : POST /timer/countdown/ :' + newCountdown);
    io.emit('timerCmd', {
      timerCmd: 'setCountdown',
      countdown: newCountdown
    });
    res.json({ sent: 'done' });
  });

  router.post('/start', function (req, res, next) {
    console.log('API CALL : POST /timer/start : socket emit called. ');
    io.emit('timerCmd', {
      timerCmd: 'start'
    });

    Vote.findOneAndUpdate({}, { gameGoingOn: true },
        function (err, vote) {
          if (err) { next(err); }
          res.json(vote);
        });
  });

  router.post('/stop', function (req, res, next) {
    console.log('API CALL : POST /timer/stop : socket emit called. ');
    io.emit('timerCmd', {
      timerCmd: 'stop'
    });

    Vote.findOneAndUpdate({}, { gameGoingOn: false },
        function (err, vote) {
          if (err) { next(err); }
          res.json(vote);
        });
  });

  router.post('/reset', function (req, res) {
    console.log('API CALL : POST /timer/reset : socket emit called. ');
    io.emit('timerCmd', {
      timerCmd: 'reset'
    });
    res.json({ sent: 'done' });
  });

  return router;
};
