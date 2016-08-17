var express = require('express');
var router = express.Router();
var path = require('path');


module.exports = function (io) {
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


  /**
   * Set the tapping page to empty page.
   */
  router.post('/setPunchEmpty', function (req, res) {
    console.log('stop punch interaction and show empty page');
    io.emit('goToPunchEmpty', {});
    res.json({ sent: 'done' });
  });

  /**
   * Requests the empty page to open up a page indicated
   * by PAGENUM.
   */
  router.post('/setTap', function (req, res) {
    console.log('turning on the tap page num : ' + req.body.pageNum);
    io.emit('goToTapPage', {});
    res.json({ sent: 'done' });
  });


  /**
   * Set the ganchor page to empty page.
   */
  router.post('/setGanchorEmpty', function (req, res) {
    console.log('stop graph toggle page and show empty page');
    io.emit('goToGanchorEmpty', {});
    res.json({ sent: 'done' });
  });


  /**
   * requests the empty page to open up a page indicated
   * by pagenum.
   */
  router.post('/setGanchor', function (req, res) {
    console.log('turning on the ganchor page');
    io.emit('goToGanchorPage', {});
    res.json({ sent: 'done' });
  });


  router.post('/setEmpty', function (req, res) {
    console.log('stop sweep interaction and show empty page');
    io.emit('goToEmptyPage', {});
    res.json({ sent: 'done' });
  });

  /**
   * Requests the empty page to open up a sweep page indicated
   * by PAGENUM.
   */
  router.post('/setSweep/', function (req, res) {
    var pageNum = req.body.pageNum;
    console.log('turning on the sweep page num : ' + req.params.pageNum);
    io.emit('goToSweepPage', {
      pageNum: pageNum
    });
    res.json({ sent: 'done' });
  });

  return router;

};
