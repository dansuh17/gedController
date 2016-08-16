/**
 * graph anchor module.
 * by Minki Chung
 */
;(function() {
  angular
      .module('ganchor', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl : "empty.html",
              controller : "ganchorEmptyCtrl"
            })
            .when('/vganchor', {
              templateUrl : "vganchor.html",
              controller : "ganchorCtrl"
            })
            .otherwise({
              redirectTo : '/empty'
            });
      });
})();
