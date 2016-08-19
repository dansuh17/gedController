var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/sweep', function(req, res, next) {
    console.log(path.join(__dirname + '/../public/interaction/sweep/index.html'));
    res.sendFile(path.join(__dirname + '/../public/interaction/sweep/index.html'));
});

router.get('/sweep/:file', function(req, res, next) {
    console.log("file needed.");
    res.sendFile(path.join(__dirname + '/../public/interaction/sweep/' + req.params.file.toString()));
});


router.get('/tap', function(req, res, next) {
    console.log(path.join(__dirname + '/../public/interaction/tap/index.html'));
    res.sendFile(path.join(__dirname + '/../public/interaction/tap/index.html'));
});

router.get('/tap/:file', function(req, res, next) {
    console.log("file needed.");
    res.sendFile(path.join(__dirname + '/../public/interaction/tap/' + req.params.file.toString()));
});


router.get('/vganchor', function(req, res, next) {
    console.log(path.join(__dirname + '/../public/interaction/vganchor/index.html'));
    res.sendFile(path.join(__dirname + '/../public/interaction/vganchor/index.html'));
});

router.get('/vganchor/:file', function(req, res, next) {
    console.log("file needed.");
    res.sendFile(path.join(__dirname + '/../public/interaction/vganchor/' + req.params.file.toString()));
});

module.exports = router;
