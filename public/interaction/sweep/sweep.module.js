/**
 * Define a new module 'sweep' for the commercial effect by
 * html overlay on video.
 * by Daniel Suh 8/2/2016
 */
;(function() {
  angular
      .module('sweep', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl : "empty.html",
              controller : "sweepEmptyCtrl"
            })
            .when('/sweep_icon', {
              templateUrl : "sweep.html",
              controller : "sweepCtrl"
            })
            .otherwise({
              redirectTo : '/empty'
            });
      });
})();
