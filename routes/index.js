var express = require('express');
var router = express.Router();

module.exports = function(io, Vote) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index');
    });

    /* for handling power bar */
    var powerRoute = require('./power');
    router.use('/power', powerRoute(io));

    /* for managing votes */
    var votesRoute = require('./votes');
    router.use('/votes', votesRoute(io, Vote));

    /* for handling power bar */
    var timerRoute = require('./timer');
    router.use('/timer', timerRoute(io));

    /* for sweep interaction page */
    var sweepRoute = require('./sweep');
    router.use('/sweep', sweepRoute(io));

    var panelRoute = require('./panel');
    router.use('/panel', panelRoute(io, Vote));

    return router;
};
