/* deprecated. */

var express = require('express');
var router = express.Router();

module.exports = function(io) {

  router.post('/setPowerBalance/:balance', function(req, res, next) {
    console.log("power balance changed via API.");
    var balance = req.params.balance;
    io.emit('setPowerBalance', {
      balance: balance
    });
    res.json({"sent": "done"});
  });

  router.post('/powerCommand/powerToLeft', function(req, res, next) {
    console.log("power To Left by five");

    io.emit('powerToLeft', {});
    res.json({"sent": "done"});
  });

  router.post('/powerCommand/powerToRight', function(req, res, next) {
    console.log("power To Right by five");

    io.emit('powerToRight', {});
    res.json({"sent": "done"});
  });

  return router;
};