var express = require('express');
var router = express.Router();

module.exports = function (io, Vote) {
  router.post('/setRoundNo/:roundNo', function (req, res) {
    console.log('API CALL : POST /timer/setRoundNo/:' + req.params.roundNo);

    // to the rest page.
    io.emit('roundNo', {
      roundNo: req.params.roundNo
    });

    res.json({ sent: 'done' });
  });

  router.post('/setCount/:cd', function (req, res) {
    var newCountdown = req.params.cd;
    console.log('API CALL : POST /timer/setCount/:' + req.params.cd);
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
