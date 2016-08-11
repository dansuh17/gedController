var express = require('express');
var router = express.Router();

module.exports = function(io, Vote) {
    router.get('/', function(req, res, next) {
        res.render('panel');
    });

    return router;
}
