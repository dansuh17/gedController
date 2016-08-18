var express = require('express');
var router = express.Router();

module.exports = function (io, Vote) {

  router.post('/', function (req, res, next) {
    var fighter1 = req.body.fighter1;
    var fighter2 = req.body.fighter2;
    console.log('API CALL : POST votes/ : ' + req.body.fighter1 + ', ' + req.body.fighter2);
    Vote.findOneAndUpdate({}, { $set: { fighter1: fighter1, fighter2: fighter2 } },
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
