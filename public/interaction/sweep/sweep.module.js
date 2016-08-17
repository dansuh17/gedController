/**
 * Define a new module 'sweep' for the commercial effect by
 * html overlay on video.
 * by Daniel Suh 8/2/2016
 */
((function sweepModule() {
  angular
      .module('sweep', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl: 'empty.html',
              controller: 'sweepEmptyCtrl',
            })
            .when('/sweep_icon', {
              templateUrl: 'sweep.html',
              controller: 'sweepCtrl',
            })
            .when('/sweep_gloves', {
              templateUrl: 'sweep2.html',
              controller: 'sweep2Ctrl',
            })
            .when('/sweep_heart', {
              templateUrl: 'sweep3.html',
              controller: 'sweep3Ctrl',
            })
            .otherwise({
              redirectTo: '/empty',
            });
      });
})());
