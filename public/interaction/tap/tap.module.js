/**
 * Defines module for tapping overlay in the app.
 * Daniel Suh, 8/16/2016
 */
;(function() {
  angular
      .module('tap', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl : "empty.html",
              controller : "tapEmptyCtrl"
            })
            .when('/tap', {
              templateUrl : "tap.html",
              controller : "tapCtrl"
            })
            .otherwise({
              redirectTo : '/empty'
            });
      });
})();