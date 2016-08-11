var express = require('express');
var router = express.Router();

module.exports = function(io) {

    router.post('/setRoundNo/:roundNo', function(req, res, next) {
        console.log("API CALL : POST /timer/setRoundNo/:" + req.params.roundNo);

        // to the rest page.
        io.emit('roundNo', {
            roundNo: req.params.roundNo
        });

        res.json({"sent": "done"});
    });

    //TODO : better to be separated.
    router.post('/timerCmd/:cmd', function(req, res, next) {
        //start, stop, reset
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

    return router;
};
