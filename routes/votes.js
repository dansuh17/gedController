var express = require('express');
var router = express.Router();

module.exports = function(io, Vote) {



    router.post('/gameGoingOn/:bool', function(req, res, next) {
        console.log("API CALL : POST gameGoingOn/" + req.params.bool);
        Vote.findOneAndUpdate({}, {gameGoingOn:req.params.bool},
            function (err, vote) {
                if (err) {return next(err);}
                res.json(vote);
            });
    });

    router.post('/votesChange/:devinUp/:tomUp/:gameGoingOn', function(req, res, next) {
        console.log("votesChange");
        Vote.findOneAndUpdate({}, {devinUp:req.params.devinUp, tomUp:req.params.tomUp, gameGoingOn:req.params.gameGoingOn},
            function(err, vote) {
                if (err) {return next(err);}
                res.json(vote);
        });
    });

    router.get('/getCurrentWinning', function(req, res, next) {
        console.log("getCurrentWinning request received.");

        Vote.findOne({}, function(err, votes){
            if(err){ return next(err); }
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("content-type", "text/javascript");

            if (req.query.callback) {
                res.jsonp(votes);
            }
            else {
                res.json(votes);
            }
        });
    });


    return router;
};
