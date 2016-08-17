/**
 * Define a new module 'sweep' for the commercial effect by
 * html overlay on video.
 * by Daniel Suh 8/2/2016
 */
((function SweepModule() {
  angular
      .module('sweep', ['ngRoute'])
      .config(['$routeProvider', function RouteProviderCallback($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl: 'empty.html',
              controller: 'SweepEmptyController',
              controllerAs: 'vm'
            })
            .when('/sweep_icon', {
              templateUrl: 'sweep.html',
              controller: 'SweepController',
              controllerAs: 'vm'
            })
            .when('/sweep_gloves', {
              templateUrl: 'sweep2.html',
              controller: 'Sweep2Controller',
              controllerAs: 'vm'
            })
            .when('/sweep_heart', {
              templateUrl: 'sweep3.html',
              controller: 'sweep3Ctrl',
              controllerAs: 'vm'
            })
            .otherwise({
              redirectTo: '/empty'
            });
      }]);
})());
