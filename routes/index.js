var express = require('express');
var router = express.Router();

module.exports = function (io, Vote, Punch) {
  /* GET the rest page. */
  router.get('/', function (req, res) {
    res.render('index');
  });

  /* GET the panel page */
  router.get('/panel', function (req, res) {
    res.render('panel');
  });

  /* for handling timer and round slates on rest page */
  var timerRoute = require('./timer');
  router.use('/timer', timerRoute(io, Vote));


  /* GET overlay pages */
  var overlayRoute = require('./overlay')(io);
  router.use('/overlay', overlayRoute);

  /* for managing votes */
  var votesRoute = require('./votes');
  router.use('/votes', votesRoute(io, Vote));

  /* for managing the punch counts on tap page */
  var punchRoute = require('./punch');
  router.use('/punch', punchRoute(Punch, io));


  /* DEPRECATED */
  var powerRoute = require('./power');
  router.use('/power', powerRoute(io));

  return router;
};
