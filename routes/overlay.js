var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/sweep', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/interaction/sweep/index.html'));
});

router.get('/sweep/:file', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/interaction/sweep/', req.params.file));
});


router.get('/tap', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/interaction/tap/index.html'));
});

router.get('/tap/:file', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/interaction/tap/', req.params.file));
});


router.get('/vganchor', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/interaction/vganchor/index.html'));
});

router.get('/vganchor/:file', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/interaction/vganchor/', req.params.file));
});

module.exports = router;
