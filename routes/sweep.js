/**
 * HTML Post functions for sweep.html page.
 * by Daniel Suh 8/11/2016
 */
var express = require('express');
var router = express.Router();

module.exports = function(io) {

  // set the sweep page to empty page
  router.post('/setEmpty', function(req, res, next) {
    console.log("stop sweep interaction and show empty page");
    io.emit("goToEmptyPage", {});
    res.json({"sent": "done"});
  });

  /**
   * Requests the empty page to open up a sweep page indicated
   * by PAGENUM.
   */
  router.post('/setSweep/:pageNum', function(req, res, next) {
    var pageNum = req.params.pageNum;
    console.log("turning on the sweep page num : " + req.params.pageNum);
    io.emit("goToSweepPage", {
      pageNum: pageNum
    });
    res.json({"sent": "done"});
  });

  return router;
};
