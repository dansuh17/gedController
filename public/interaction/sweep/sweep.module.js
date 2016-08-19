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
              templateUrl: 'empty.html',
              controller: 'SweepController',
              controllerAs: 'vm'
            })
            .when('/sweep_gloves', {
              templateUrl: 'empty.html',
              controller: 'Sweep2Controller',
              controllerAs: 'vm'
            })
            .when('/sweep_heart', {
              templateUrl: 'empty.html',
              controller: 'sweep3Ctrl',
              controllerAs: 'vm'
            })
            .otherwise({
              redirectTo: '/empty'
            });
      }]);
})());
