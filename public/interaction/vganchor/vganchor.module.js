/**
 * Voting interface where user can vote for a fighter
 * and view the aggregate results from cloud sourcing.
 * by Minki Chung & Daniel Suh
 */
((function vganchorModule() {
  angular
      .module('vganchor', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider
            .when('/empty', {
              templateUrl: 'empty.html',
              controller: 'vganchorEmptyCtrl',
            })
            .when('/vganchor', {
              templateUrl: 'vganchor.html',
              controller: 'VganchorController',
              controllerAs: 'vm'
            })
            .otherwise({
              redirectTo: '/empty',
            });
      });
})());
