/**
 * Defines module for tapping overlay in the app.
 * Daniel Suh, 8/16/2016
 */
((function TapModule() {
  angular
      .module('tap', ['ngRoute'])
      .config(['$routeProvider', function TapModuleConfigCallback($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl: 'empty.html',
              controller: 'TapEmptyController',
              controllerAs: 'vm'
            })
            .when('/tap', {
              templateUrl: 'tap.html',
              controller: 'TapController',
              controllerAs: 'vm'
            })
            .otherwise({
              redirectTo: '/empty'
            });
      }]);
})());
