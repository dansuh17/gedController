var express = require('express');
var router = express.Router();

module.exports = function(io) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.get('/sample', function(req, res, next) {
        res.render('sample', {title: 'Express'});
    });

    router.post('/setPowerBalance/:balance', function(req, res, next) {
        console.log("power balance changed via API.");
        var balance = req.params.balance;
        io.emit('setPowerBalance', {
            balance: balance
        });
        res.json({"sent": "done"});
    });

    router.post('/setRoundNo/:roundNo', function(req, res, next) {
        console.log("roundNo changed via API.");
        var newRoundNo = req.params.roundNo;
        io.emit('roundNo', {
            roundNo: newRoundNo
        });
        res.json({"sent": "done"});
    });

    router.post('/timerCmd/:cmd', function(req, res, next) {
        console.log("timer command called via API");
        var cmd = req.params.cmd;
        io.emit('timerCmd', {
            timerCmd: cmd
        });
        res.json({"sent": "done"});
    });

    router.post('/timerCmd/setCountdown/:countdown', function(req, res, next) {
        var newCountdown = req.params.countdown;
        console.log("countdown set to " + newCountdown);
        io.emit('timerCmd', {
            timerCmd: 'setCountdown',
            countdown: newCountdown
        });
        res.json({"sent": "done"});
    });

    router.post('/powerCommand/powerToLeft', function(req, res, next) {
        console.log("power To Left by five");

        io.emit('powerToLeft', {});
        res.json({"sent": "done"});
    });

    router.post('/powerCommand/powerToRight', function(req, res, next) {
        console.log("power To right by five");

        io.emit('powerToRight', {});
        res.json({"sent": "done"});
    });
    return router;
};
