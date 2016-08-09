/**
 * HTML Post functions for sweep.html page.
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

  // turn on the sweep page
  router.post('/setSweep', function(req, res, next) {
    console.log("turning on the sweep page");
    io.emit("goToSweepPage", {});
    res.json({"sent": "done"});
  });

  return router;
};
