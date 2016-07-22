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


    router.post('/energyBarChange/:fighter/:part/:amount', function(req, res, next) {
        console.log("energyBarChange command called via API");
        var fighter = req.params.fighter;
        var part = req.params.part;
        var amount = req.params.amount;

        io.emit('energyBarChange', {
            fighter: fighter,
            part: part,
            amount: amount
        });
        res.json({"sent": "done"});
    });

    return router;
}
