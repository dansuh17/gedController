/**
 * This is for the graph anchor in order to show up the graph only when the
 * button is clicked this uses graph in d3.
 * Created by Minki Chung on 8/9/16.
 */
;(function() {
  angular
      .module('ganchor')
      .controller('ganchorCtrl', ['$scope', function($scope) {
          $scope.graphOn = false;

      }]);
})();
