var express = require('express');
var router = express.Router();

module.exports = function (io, Vote) {

  router.post('/', function (req, res, next) {
    console.log('API CALL : POST votes/ : ' + req.body.devinUp + ', ' + req.body.tomUp);
    Vote.findOneAndUpdate({}, { $set: { devinUp: req.params.devinUp, tomUp: req.params.tomUp } },
        function (err, vote) {
          if (err) { next(err); }
          res.json(vote);
        });
  });

  router.get('/', function (req, res, next) {
    console.log('API CALL : GET votes/');

    Vote.findOne({}, function (err, votes) {
      if (err) { next(err); }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('content-type', 'text/javascript');

      if (req.query.callback) {
        res.jsonp(votes);
      } else {
        res.json(votes);
      }
    });
  });

  return router;
};
