/* DEPRECATED */

var express = require('express');
var router = express.Router();

module.exports = function (io) {
  router.post('/setPowerBalance/:balance', function (req, res) {
    var balance = req.params.balance;

    console.log('power balance changed via API.');
    io.emit('setPowerBalance', {
      balance: balance
    });
    res.json({ sent: 'done'});
  });

  router.post('/powerCommand/powerToLeft', function(req, res) {
    console.log('power To Left by five');

    io.emit('powerToLeft', {});
    res.json({ sent: 'done' });
  });

  router.post('/powerCommand/powerToRight', function(req, res) {
    console.log('power To Right by five');

    io.emit('powerToRight', {});
    res.json({ sent: 'done' });
  });

  return router;
};
