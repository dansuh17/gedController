var express = require('express');
var router = express.Router();

module.exports = function(Punch, io) {
    router.post('/:fighter1/:fighter2', function(req, res, next) {
        console.log("API CALL : POST to punch" + req.params.fighter1 + "/" + req.params.fighter2);
        Punch.findOneAndUpdate({}, { fighter1:req.params.fighter1,
                fighter2: req.params.fighter2},
            function (err, punch) {
                if (err) {return next(err);}
                console.log("successfully updated punch.");
                res.json(punch);
            });
    });

    router.get('/', function(req, res, next) {
        console.log("API CALL : GET to punch");

        Punch.findOne({}, function(err, punch) {
            if (err) {return next(err)}
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("content-type", "text/javascript");

            if (req.query.callback) {
                res.jsonp(punch);
            }
            else {
                res.json(punch);
            }

        });
    });

    /**
     * Set the tapping page to empty page.
     */
    router.post('/setPunchEmpty', function(req, res, next) {
        console.log("stop punch interaction and show empty page");
        io.emit("goToPunchEmpty", {});
        res.json({"sent": "done"});
    });

    /**
     * Requests the empty page to open up a page indicated
     * by PAGENUM.
     */
    router.post('/setTap', function(req, res, next) {
        var pageNum = req.params.pageNum;
        console.log("turning on the tap page num : " + req.params.pageNum);
        io.emit("goToTapPage", {
            pageNum: pageNum
        });
        res.json({"sent": "done"});
    });

    return router;
};